export type UserRole = "contributor" | "maintainer";
export type IssueType = "bug" | "features_request";
export type IssueStatus = "open" | "in_progress" | "resolved";

export interface IUser {
    id:number,
    name: string,
    email: string,
    password?: string,
    role: UserRole,
    created_at: Date,
    updated_at: Date
}

export interface IIssue {
    id:number,
    title: string,
    description: string,
    type: IssueType,
    status: IssueStatus,
    reporter_id: number,
    created_at: Date,
    updated_at: Date
}