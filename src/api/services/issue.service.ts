import { pool } from "../../db"
import type { IIssue, IssueType, IssueStatus, UserRole,  } from "../../types"
import type { IAppError } from "../../types/interface.error"


interface IIssueFilters {
    sort?: string,
    type?: IssueType,
    status?: IssueStatus
}

// follow DRY principal rules and IIssue data came from types folder index.ts file
interface IIssueWithReporter extends Omit<IIssue, "reporter_id"> {
    reporter: {
        id: number,
        name: string,
        role: UserRole,
    } | null
}

class IssueService {

    // new issue
    async insertIssue(data: {title: string, description: string, type: string, reporter_id: number}): Promise<IIssue> {
    
        const query = `
        
        INSERT INTO issues (title, description, type, reporter_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        
        `
        const result = await pool.query(query, [data.title, data.description, data.type, data.reporter_id])
        return result.rows[0]
    }

    // all issue filtering and in-memory relational mapping
    async fetchIssues(filters: IIssueFilters): Promise<IIssueWithReporter[]> {
        let sqlString = "SELECT * FROM issues WHERE 1=1"
        const queryParams: unknown[] = []
    

    if (filters.type) {
        queryParams.push(filters.type)
        sqlString += ` AND type = $${queryParams.length}`
    }

    if (filters.status) {
        queryParams.push(filters.status)
        sqlString += ` AND status = $${queryParams.length}`
    }

    const sortOrder = filters.sort === "oldest" ? "ASC" : "DESC"
    sqlString += ` ORDER BY created_at ${sortOrder}`

    const issuesResult = await pool.query(sqlString, queryParams)
    const issues: IIssue[] = issuesResult.rows

    if (issues.length === 0) {
        return []
    }

    const reporterIds = Array.from(new Set(issues.map(issue => issue.reporter_id)))
    const placeholders: string[] = []
    for (let i = 0; i < reporterIds.length; i++) {
        placeholders.push(`$${i + 1}`)
    }

    const placeholderString = placeholders.join(",")

    // now execute the SQL query
    const usersResult = await pool.query(
        `SELECT id, name, role FROM users WHERE id IN (${placeholderString})`,
        reporterIds
    ) 

    // create memory mapping
    const userMap = new Map<number, {id: number, name: string, role: UserRole}> ()
    usersResult.rows.forEach(user => userMap.set(user.id, user))
    

    // return all reporter data
    return issues.map(issue => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: userMap.get(issue.reporter_id) || null,
        created_at: issue.created_at,
        updated_at: issue.updated_at

    }))
  } 

  // see a specific issues details
  async fetchIssueById(id: number): Promise<IIssueWithReporter | null> {
     const issueResult = await pool.query("SELECT * FROM issues WHERE id = $1", [id])
     if(issueResult.rows.length === 0) {
        return null
     }

     const issue: IIssue = issueResult.rows[0]
     const userResult = await pool.query("SELECT id, name, role FROM users WHERE id = $1", [issue.reporter_id])
     const reporter = userResult.rows.length > 0? userResult.rows[0] : null
  
     return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,reporter,
        created_at: issue.created_at,
        updated_at: issue.updated_at
  
     }
  }
  
  // update issue
  async modifyIssue (id: number, reqUser: {id: number, role: string}, updates: Record<string, string | undefined>): Promise<IIssue> {
    const currentIssueResult = await pool.query("SELECT * FROM issues WHERE id = $1", [id])

    if(currentIssueResult.rows.length === 0) {
        const err = new Error("Issue not found") as IAppError
        err.statusCode = 404
        throw err
    }

    const currentIssue: IIssue = currentIssueResult.rows[0]

    if(reqUser.role === "contributor") {
        
        if(currentIssue.reporter_id !== reqUser.id){
            const err = new Error("Forbidden - Cannot modify another contributors") as IAppError
            err.statusCode = 403
            throw err
        }

        if (currentIssue.status !== "open") {
            const err = new Error("Conflict - Contributor can only edit issues with open status") as IAppError
            err.statusCode = 409
            throw err
        }
    }
    
    // back up old database 
    const title = updates.title || currentIssue.title
    const description = updates.description || currentIssue.description
    const type = (updates.type as IssueType) || currentIssue.type
   
    let status: IssueStatus;

    if (reqUser.role === "maintainer") {
        status = (updates.status as IssueStatus) || currentIssue.status;
    } else {
        status = "in_progress";
    }
    
    const updateQuery = `
       
       UPDATE issues SET title = $1, description = $2, type = $3, status = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *
     
       `
       const finalResult = await pool.query(updateQuery, [title, description, type, status, id])
       return finalResult.rows[0]
  }

  // remove issue from the database
  async removeIssue(id: number): Promise<void> {
    
    // const issueId = Number(id)
    const parsedId = Number(id)
    const check = await pool.query("SELECT id FROM issues WHERE id = $1", [parsedId])

    if(check.rows.length === 0) {
        const err = new Error("Issue not found") as IAppError
        err.statusCode = 404
        throw err
    }

    await pool.query("DELETE FROM issues WHERE id = $1", [parsedId])

  }

}

export const issueService = new IssueService()