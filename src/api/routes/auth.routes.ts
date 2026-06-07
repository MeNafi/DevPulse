import { Router } from 'express'
import { signupController, loginController } from '../controllers/auth.controller'

const router = Router()

// Handle secure user registration gateway
router.post("/signup", signupController)

// Handle secure user authentication session creation
router.post("/login", loginController)

export default router