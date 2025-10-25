import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import type { ErrorResponse } from "../model/error_response.ts";

export function mapMongoError(err: mongoose.Error) : ErrorResponse {
  if (err instanceof mongoose.Error.ValidationError) {
    return { status: StatusCodes.BAD_REQUEST, message: "Validation failed" };
  }
  else if (err instanceof mongoose.Error.CastError) {
    return { status: StatusCodes.BAD_REQUEST, message: "Invalid data type" };
  }
  else if ((err as any).code === 11000) {
    return { status: StatusCodes.CONFLICT, message: "Duplicate entry" };
  }
  else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return { status: StatusCodes.NOT_FOUND, message: "Resource not found" };
  }
  else if (err instanceof mongoose.Error.StrictModeError) {
    return { status: StatusCodes.BAD_REQUEST, message: "Invalid field" };
  }

  return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: "Internal server error" };
}
