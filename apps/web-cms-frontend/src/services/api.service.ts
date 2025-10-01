import { HTTP } from "@blog-frontend/core";
import { ILoginData, IResponse } from "@blog-frontend/shared";

export const login = (identifier: string, password: string): Promise<IResponse<ILoginData>> => {
    return HTTP.post('/users/login', { identifier, password });
}