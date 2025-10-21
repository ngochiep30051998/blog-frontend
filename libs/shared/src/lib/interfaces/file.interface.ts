import { FileType } from "../enums/file.enum";

export interface IUploadImageData {
    file: File;
    type: FileType;
    caption?: string;
    alt?: string;
    seoTitle?: string;
    description?: string;
    seoDescription?: string;
}

export interface ISingleFileUpload {
    id: string;
    originalName: string;
    filename: string;
    mimetype: string;
    size: number;
    type: string;
    status: string;
    cloudinaryPublicId: string;
    cloudinaryUrl: string;
    cloudinarySecureUrl: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
    alt: string;
    caption: string;
    description: string;
    tags: string[];
    uploadedBy: string;
    uploadedByName: string;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
    responsiveUrls: {
        small: string;
        medium: string;
        large: string;
        original: string;
    };
    downloadCount: number;
    viewCount: number;
    version: number;
    createdAt: string;
    updatedAt: string;
}