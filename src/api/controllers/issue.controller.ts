import type {Request, Response, NextFunction} from "express"
import { issueService } from "../services/issue.service"
import { authService } from "../services/auth.services"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import type { IssueType, IssueStatus } from "../../types"


export const createIssueController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { title, description, type } = req.body
        const reporter_id = req.user!.id

        if (!title || !description || !type) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, {
                success: false,
                message: "Validation failed! Title, description and type must be provided",
            })
        }

        const newIssue = await issueService.insertIssue({
            title,
            description,
            type: type as IssueType,reporter_id
        })

        return sendResponse(res, StatusCodes.CREATED, {
            success: true,
            message: "Issue created successfully",
            data: newIssue
        })
    
    } catch (error) {
        next(error)
    }
 }


 // filter all issue with query params
 export const getAllIssuesController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {sort, type, status} = req.query

        // destructuring the query and pass to service layer
        const issues = await issueService.fetchIssues({
            sort: sort as string,
            type: type as IssueType,
            status: status as IssueStatus
        })
          
        return sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Issues retrieved successfully",
            data: issues
        
        }) 
     }  catch (error) {
            next(error)
    }
}


// Retrieve the details of a specific issue using its unique ID.
export const getSingleIssueController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id } = req.params
        const issue = await issueService.fetchIssueById(Number(id))

        if (!issue) {
            return sendResponse(res, StatusCodes.NOT_FOUND, {
                success: false,
                message: "Issue not found",
            })
        }

        return sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Issue retrieved successfully",
            data: issue
        })
    } catch (error) {
        next(error)
    }
}

    // Update the details of an existing issue, such as its title, description, type, or status.
    
    export const updateIssueController = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { id } = req.params
            const { title, description, type, status } = req.body
        
            const updatedIssue = await issueService.modifyIssue(Number(id), req.user!, {
                title, 
                description,
                type: type as string,
                status: status as string
            })

            return sendResponse(res, StatusCodes.OK, {
                success: true,
                message: "Issue updated successfully",
                data: updatedIssue
            })
        
        } catch (error) {
            next(error)
        }
    }


    // remove issue from database permanently
    export const deleteIssueController = async (req: Request, res: Response, next: NextFunction) => {

        try {
          
        interface CustomDeleteRequest extends Request {
            params: {
                id: string;
            };
        }

        const safeReq = req as CustomDeleteRequest;
        const { id } = safeReq.params;
        const issueId = Number(id ? id.trim() : "");

        if (isNaN(issueId)) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, {
                success: false,
                message: "Invalid Issue ID format. ID must be a valid number",
            })
        }
            await issueService.removeIssue(issueId)

            return sendResponse(res, StatusCodes.OK, {
                success: true,
                message: "Issue deleted successfully",
            })
    
        } catch (error) {
            next(error)
        }

    }