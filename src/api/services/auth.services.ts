import { pool } from "../../db"
import { config } from "../../config"
import  {type IUser } from "../../types"
import bcrypt from "bcrypt"
import { generateToken } from "../../utils/jwt"
import { type IAppError } from "../../types/interface.error"



// Model the standard compound package returned upon successful session verification
interface IAuthResponse {
    token: string,
    user: Omit<IUser, "password">
}

class AuthService {

    async registerUser (userData: Partial<IUser>): Promise<IUser> {
        const {name, email, password, role } = userData

        // check email was previously registered or not
        const checkUser = await pool.query("SELECT id FROM users WHERE email = $1", [email])
        
        if(checkUser.rows.length > 0){
            const error = new Error ("Email address already registered") as IAppError
            error.statusCode = 400
            throw error
        }

        // now password hashing
        const hashedPassword = await bcrypt.hash(password!, config.bcrypt_salt_rounds)
        const finalRole = role || "contributor"

        const insertQuery = `
        
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role, created_at, updated_at
        
        `

        const result = await pool.query(insertQuery, [name, email, hashedPassword, finalRole])
        return result.rows[0]
    }

    // User login Authentication Logic
    async authenticateUser (email: string, password: string): Promise<IAuthResponse | null> {

        const query = "SELECT * FROM users WHERE email = $1"
        const result = await pool.query(query, [email])

        if (result.rows.length === 0){
            return null;
        }

        const user: IUser = result.rows[0]

        // Password Matching Check
        const isPasswordMatched = await bcrypt.compare(password, user.password!)
        if(!isPasswordMatched){
            return null
        }

        const token = generateToken ({id:user.id, name: user.name, role: user.role})
        return {
            token,
            user: {

                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                created_at: user.created_at,
                updated_at: user.updated_at
            }
        }
    }

    async findUserById (userId: number): Promise<Omit<IUser, "password"> | null> {
        const query = `
            SELECT id, name, email, role, created_at, updated_at 
            FROM users 
            WHERE id = $1
        `
        const result = await pool.query(query, [userId])

        if (result.rows.length === 0) {
            return null
        }

        return result.rows[0]
    }
}

export const authService = new AuthService();