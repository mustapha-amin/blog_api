import { Router } from "express";
import { updateUser, deleteUser, fetchUsers, fetchUserById } from "./user_controller.ts";

const usersRouter = Router()

usersRouter.patch('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)
usersRouter.get('/', fetchUsers)
usersRouter.get('/:id', fetchUserById)

export default usersRouter