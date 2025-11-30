export type IUserRole = "USER" | "HOST" | "ADMIN";

export interface IUserCreateInput {
    email: string;
    password: string;
    fullName: string;
    profileImage?: string;
    interests?: string[];
    city?: string;
    role?: IUserRole;
}
