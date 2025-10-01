import React from "react";

export interface IMenuItem {
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    to?: string,
    children?: IMenuItem[],
    component?: React.ReactNode,
    onClick?: () => void
}
export interface IMeta {
    timestamp: string;
    loginAt: string;
}
export interface IResponse<T>{
    statusCode: number
    message: string
    meta?: IMeta;
    data: T
}

export interface IQueryPayload {
    q?: string;
    page: number;
    per_page: number;
}

export interface IAttributes {
    [key: string]: string[];
}
