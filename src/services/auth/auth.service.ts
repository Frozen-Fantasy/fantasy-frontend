import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignUpRequestBody } from 'src/utils/dto';

export const BASE_API_URL = 'http://185.119.57.120:8000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}

  sendEmail(email:string):Observable<any>{
    return this.http.post(`${BASE_API_URL}/auth/email/send-code`,{email:email})
  }

  signUp(body:ISignUpRequestBody):Observable<any>{
    return this.http.post(`${BASE_API_URL}/auth/sign-up`,body);
  }
}
