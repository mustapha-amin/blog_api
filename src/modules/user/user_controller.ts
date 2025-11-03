import { type Request, type Response } from "express";
import { BadRequestError, NotFoundError } from "../../model/api_error.ts";
import { User } from "./user_model.ts";
import { StatusCodes } from "http-status-codes";

export async function updateUser(req: Request, res: Response) {
	
}

export async function deleteUser(req: Request, res: Response) {
	const id = req.params.id;
	if (!id) {
		throw new BadRequestError("Missing required parameters");
	}

	const deleted = await User.findByIdAndDelete(id);
	if (!deleted) {
		throw new NotFoundError("User not found");
	}

	return res.status(StatusCodes.OK).json({
		message: "user deleted successfully"
	})
}

export async function fetchUsers(_: Request, res: Response) {
	const users = await User.find({}).select('id email username role createdAt updatedAt');

	return res.status(StatusCodes.OK).json({
		message: "Users fetched successfully",
		users: users
	})
}

export async function fetchUserById(req: Request, res: Response) {
    const id = req.params.id;
    if(!id) {
        throw new BadRequestError("Missing user id")
    }

    const user = await User.findById(id).select('id email username role createdAt updatedAt');
    if(!user) {
        throw new NotFoundError("User not found")
    }

    return res.status(StatusCodes.OK).json({
		message: "User fetched successfully",
		user:user
	})
}
