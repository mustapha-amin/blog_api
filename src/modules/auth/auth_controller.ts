import { type Request, type Response } from "express";
import { BadRequestError, NotFoundError, UnauthenticatedError, UnauthorizedError } from "../../model/api_error.ts";
import { User } from "../user/user_model.ts";
import { generateTokens, verifyRefreshToken } from "../../utils/auth_tokens_utils.ts";
import { StatusCodes } from "http-status-codes";
import { registerSchema } from "./auth_validator.ts";
import type { ReqUser} from "../../types/request.js";

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
        throw new BadRequestError("Invalid password")
    }

    const reqUser : ReqUser = {userId: user.id, role: user.role}

    const tokens = generateTokens(reqUser)        

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
    const reqUser : ReqUser = {userId: user.id, role: user.role}
    const tokens = generateTokens(reqUser)
    user.refreshTokens.push(tokens.refresh)

    return res.status(StatusCodes.CREATED).json({
        message:"user created successfully",
        tokens
    })
}

export const logout = async (req:Request, res:Response) => {
    const {refresh} = req.body
    if(!refresh) {
        throw new UnauthorizedError()
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

export const refresh = async (req:Request, res:Response) => {
    const {refresh} = req.body;
     if(!refresh) {
        throw new UnauthorizedError()
    }

    const payload = verifyRefreshToken(refresh);

    const user = await User.findById(payload.userId);
    
    if(!user) {
       throw new NotFoundError("User not found")
    }
    
    const reqUser : ReqUser = {userId: user.id, role: user.role}
    
    let newRefreshTokens = user?.refreshTokens.filter((token) => token !== refresh)
    
    const tokens = generateTokens(reqUser)
    newRefreshTokens.push(tokens.refresh);
    await User.findByIdAndUpdate(payload.userId, {refreshTokens:newRefreshTokens}, {new:true})

    return res.status(StatusCodes.OK).send({
        message: "tokens refreshed",
        tokens
    })
}