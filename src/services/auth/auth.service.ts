import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}

  sendEmail(email:string):Observable<any>{
    return this.http.post('185.119.57.12/auth/email/send-code',{email:email})
  }
}
