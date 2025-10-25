import { StatusCodes } from "http-status-codes"

abstract class ApiError extends Error {
    statusCode: number
    constructor(message:string, statusCode:number) {
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, ApiError.prototype)
    }
}

class NotFoundError extends ApiError {
    constructor(message:string) {
        super(message, StatusCodes.NOT_FOUND)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

class UnauthorizedError extends ApiError {
    constructor(message:string) {
        super(message, StatusCodes.UNAUTHORIZED)
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }
}

class BadRequestError extends ApiError {
    constructor(message:string) {
        super(message, StatusCodes.BAD_REQUEST)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
}

class UnauthenticatedError extends ApiError {
    constructor(message:string) {
        super(message, StatusCodes.BAD_REQUEST)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
}

export {
    ApiError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    UnauthenticatedError
}