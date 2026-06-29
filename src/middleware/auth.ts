import {type Request, type Response, type NextFunction} from "express"
import { verifyToken } from "../utils/jwt"
import { sendResponse } from "../utils/sendResponse"
import { type UserRole } from "../types/index"
import { StatusCodes } from "http-status-codes"   // its a library

interface ICustomUser {
    id: number,
    name: string,
    role: UserRole
}

export const authGuard = (...allowedRoles: string[]) => {
   
    return(req: Request, res: Response, next: NextFunction) => {

        const authHeader = req.headers.authorization

        if (!authHeader) {
            return sendResponse (res, StatusCodes.UNAUTHORIZED, {
                success: false,
                message: "Unauthorized access! Missing JWT token",
            })
        }

        
        // Accept both raw token and "Bearer <token>" format
        let token = authHeader

        if (authHeader.toLowerCase().startsWith("bearer ")) {
            token = authHeader.slice(7).trim()
        }


        if (!token) {
            return sendResponse (res, StatusCodes.UNAUTHORIZED, {
                success: false,
                message: "Invalid authorization header format",
            })
        }

       // Verify the signature against central ecosystem security layers
        const decoded = verifyToken(token);
        
        if(!decoded) {
            return sendResponse(res, StatusCodes.UNAUTHORIZED, {
                success: false,
                message: "Invalid or Expired access Token"
            })
        }

        // Evaluate security authorization credentials based on system runtime profiles
        if(allowedRoles.length && !allowedRoles.includes(decoded.role as string)){

            return sendResponse(res, StatusCodes.FORBIDDEN, {
                success: false,
                message: "Forbidden - Insufficient Role Privileges"
            })
        }

        // Safely bind the fully unpacked token state configuration to the express request session
        req.user = decoded as unknown as ICustomUser;
        next();
    }
}
