import { UserRole } from "../enums/roles.enum";

export interface IUser {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    bio: string;
    avatar: string | null;
    role: UserRole;
    isActive: boolean;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string;
    fullName: string;
}