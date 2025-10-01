import { IUser } from "./user.interface";

export interface ILoginData {
    user: IUser;
    accessToken: string;
    tokenType: string;
    expiresIn: number;
}
