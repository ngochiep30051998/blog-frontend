import { HTTP } from "@blog-frontend/core";
import { ILoginData, IResponse, ISingleFileUpload, IUploadImageData } from "@blog-frontend/shared";

export const login = (identifier: string, password: string): Promise<IResponse<ILoginData>> => {
    return HTTP.post('auth/login', { identifier, password });
}

export const uploadImage = (data: IUploadImageData): Promise<IResponse<ISingleFileUpload>> => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('type', data.type);
    if (data.caption) {
        formData.append('caption', data.caption);
    }
    if (data.alt) {
        formData.append('alt', data.alt);
    }
    if (data.seoTitle) {
        formData.append('seoTitle', data.seoTitle);
    }
    if (data.description) {
        formData.append('description', data.description);
    }
    if (data.seoDescription) {
        formData.append('seoDescription', data.seoDescription);
    }
    return HTTP.post('files/upload-single', formData);
}
