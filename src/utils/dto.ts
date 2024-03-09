import { Timestamp } from "rxjs";

export interface ISignUpRequestBody{
    code:number;
    email:string;
    nickname:string;
    password:string;
}

export interface ILoginRequestBody{
    email:string;
    password:string;
}

export interface IAuthResponse{
    accessToken:string;
expiresIn: Date
refreshToken: string
}