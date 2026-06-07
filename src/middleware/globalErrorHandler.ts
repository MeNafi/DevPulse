import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { type IAppError } from "../types/interface.error"


// Intercept unhandled controller exceptions to safely format the global error envelope
export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const errorInstance = err as IAppError
    const statusCode = errorInstance.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const errorMessage = errorInstance.message || "Something went wrong the platform routing engine";


// Transmit the structured error package safely using our centralized generic utility
sendResponse(res, statusCode, {
    success: false,
    message: errorMessage,
    errors: errorInstance
})

}