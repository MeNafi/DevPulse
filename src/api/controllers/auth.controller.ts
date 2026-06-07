import type { Request, Response, NextFunction } from "express"
import { authService } from "../services/auth.services"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"

export const signupController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {name, email, password, role} = req.body

        // basic input validation
        if(!name || !email || !password) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, {
                success: false,
                message: "Validation failed! Name, email and password must be provided",
            })
        }

        const newUser = await authService.registerUser({name, email, password, role})

        return sendResponse(res, StatusCodes.CREATED, {
            success: true,
            message: "User registered successfully",
            data: newUser
        }) 
    } catch (error) {
            next(error)
    }
}



// handle user login and credential verification
export const loginController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {email, password} = req.body

        if (!email || !password) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, {
                success: false,
                message: "Email and password are required",
            })
        }
    
    const loginResult = await authService.authenticateUser(email, password)

    if (!loginResult) {
        return sendResponse(res, StatusCodes.UNAUTHORIZED, {
            success: false,
            message: "Invalid credentials provided",
        })
    }
     
    // return sendResponse
    return sendResponse(res, StatusCodes.OK, {
        success: true,
        message: "Login Successful",
        data: loginResult
    })
    
  } catch (error) {
    next(error)
  }
}