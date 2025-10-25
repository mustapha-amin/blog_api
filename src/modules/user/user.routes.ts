import { Router } from "express";

const usersRouter = Router()

usersRouter.post('/create')
usersRouter.patch('/:id')
usersRouter.delete('/:id')
usersRouter.get('/')