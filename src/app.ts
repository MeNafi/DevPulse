import express, {type Application, type NextFunction, type Request, type Response} from "express"
import cookieParser from "cookie-parser"
import { logger } from "./middleware/logger"
import { globalErrorHandler } from "./middleware/globalErrorHandler"
import authRoutes from "./api/routes/auth.routes"
import issueRoutes from "./api/routes/issue.routes"


const app: Application = express();


// Global middleware
app.use(express.json());
app.use(cookieParser());
app.use(logger);


// Define the root API endpoint to verify baseline server health status
app.get("/", (req: Request, res: Response) => {
    res.status(200).json ({
        success: true,
        message: "Welcome to DevPulse Back-End API Ecosystem Server!"
    })
})

// Applications API Routes
app.use("/api/auth", authRoutes)
app.use("/api/issues", issueRoutes)



// Global 404 handler 
app.use("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Requested API Endpoint Not Found"
    })
})


export default app;
