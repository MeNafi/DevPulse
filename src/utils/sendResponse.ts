import { type Response } from "express";
import { error } from "node:console";

// Define strict error structure for application validation failures
interface IErrorDetails {
    path: string | number,
    message: string
}


// Model the standard API envelope with dynamic payload type configuration
interface IResponseData<T> {
    success: boolean,
    message: string,
    data?: T,
    errors?: IErrorDetails[] | unknown
}

// Export the centralized wrapper to handle all express HTTP responses safely
export const sendResponse = <T>(
    res: Response,
    statusCode: number,
    payload: IResponseData<T>
): void => {
    res.status(statusCode).json({
        success: payload.success,
        message: payload.message,
        data: payload.data ?? null,
        // If errors are undefined or null, an empty object will be spread.
        ...((payload.errors !== undefined && payload.errors !== null) ? { errors: payload.errors } : {})
    })

    
}