import type { NextFunction, Request, Response } from "express";

// Middleware to log incoming HTTP requests with timestamp, method, and URL
export const logger = (req: Request, res: Response, next: NextFunction) => {
     
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] HTTP Method: ${req.method} | Destination: ${req.url}`)
    next()
}
