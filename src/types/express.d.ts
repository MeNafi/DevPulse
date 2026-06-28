import { UserRole } from "./index";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id:number,
                name:string,
                role: UserRole
            }
        }
    }
}
