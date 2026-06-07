import { Router } from 'express'
import {
    createIssueController,
    getAllIssuesController,
    getSingleIssueController,
    updateIssueController,
    deleteIssueController
} from '../controllers/issue.controller'

import { authGuard } from '../../middleware/auth'

const router = Router()

// Handle secure issue creation for authenticated users
router.post("/", authGuard("contributor", "maintainer"), createIssueController)


// Expose public endpoints for browsing system issues without guards
router.get("/", getAllIssuesController)
router.get("/:id", getSingleIssueController)


// Process conditional updates governed by service layer business rules
router.patch("/:id", authGuard("contributor", "maintainer"), updateIssueController)

// Restrict destructive actions strictly to administrative roles
router.delete("/:id", authGuard("maintainer"), deleteIssueController)

export default router