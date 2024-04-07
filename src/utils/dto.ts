export const BASE_API_URL = 'http://185.119.57.120:8000/api/v1';

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