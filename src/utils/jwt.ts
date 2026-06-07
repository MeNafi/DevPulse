import jwt from "jsonwebtoken";
import { type JwtPayload } from "jsonwebtoken"
import { config } from "../config"

// Generate a secure JSON Web Token containing the identity and system role of the user
export const generateToken = (payload: {id: number, name: string, role: string}): string => {
      
    const options = {
        expiresIn: config.jwt_expires_in
    } as jwt.SignOptions

    return jwt.sign(payload, config.jwt_secret as string, options);
}


// Intercept and decrypt incoming token signatures to safely verify active sessions
export const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, config.jwt_secret as string) as jwt.JwtPayload
    } catch (error) {
      return null
    }
}