import { type Request, type Response } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../model/api_error.ts";
import { User } from "../user/user_model.ts";
import jwt from "jsonwebtoken";
import { generateTokens } from "../../utils/auth_tokens_gen.ts";
import { StatusCodes } from "http-status-codes";
import { registerSchema } from "./auth_validator.ts";
import bcrypt, { genSalt } from "bcryptjs";

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }

    const user = await User.findOne({ email })

    if(!user) {
        throw new NotFoundError("User not found")
    }

    if(!(await user.comparePassword(password))) {
        const salt = await genSalt(10);
        const pass = await bcrypt.hash("Password123#", salt)
        throw new BadRequestError("Invalid password")
    }

    const tokens = generateTokens(user)        

    user.refreshTokens.push(tokens.refresh)
    await user.save()
    return res.status(StatusCodes.OK).send({
        message:"user logged in successfully",
        tokens
    })
}

export const register = async (req:Request, res:Response) => {
    const {email, password, username} = req.body;
      
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }

    if(!(registerSchema.safeParse(req.body)).success) {
        throw new BadRequestError("Invalid inputs")
    }

    const existingUser = await User.findOne({email})

    if(existingUser) {
        throw new BadRequestError("User already exists")
    }

    const user = await User.create({email, password, username})
    const tokens = generateTokens(user)

    return res.status(StatusCodes.CREATED).json({
        message:"user created successfully",
        tokens
    })
}

export const logout = async (req:Request, res:Response) => {
    const {refresh} = req.body
    if(!refresh) {
        throw new UnauthorizedError("Refresh token missing")
    }

     const user = await User.findOne({ refreshTokens: refresh });

     if(!user) {
        return res.status(StatusCodes.OK).send({
            message:"Logged out successfully"
        })
     }

    user.refreshTokens = user.refreshTokens.filter((token) => token != refresh)
    
    await user.save()
    return res.status(StatusCodes.OK).send({
            message:"Logged out successfully"
    })
}