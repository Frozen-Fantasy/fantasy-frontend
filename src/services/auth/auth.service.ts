import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, take } from 'rxjs';
import {
  BASE_API_URL,
	IAuthResponse,
	ILoginRequestBody,
	ISignUpRequestBody,
} from 'src/utils/dto';

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	constructor(private http: HttpClient, private router: Router) {
	}

	sendEmail(email: string): Observable<any> {
		return this.http.post(`${BASE_API_URL}/auth/email/send-code`, {
			email: email,
		});
	}

	signUp(body: ISignUpRequestBody): Observable<any> {
		return this.http.post(`${BASE_API_URL}/auth/sign-up`, body);
	}

	login(body: ILoginRequestBody): Observable<IAuthResponse> {
		return this.http.post<IAuthResponse>(
			`${BASE_API_URL}/auth/sign-in`,
			body
		);
	}

	refreshToken(){
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
		if (refreshToken) {
      //todo: refactor refresh logic
			return this.http.post<IAuthResponse>(
				`${BASE_API_URL}/auth/refresh-tokens`,
				{ refreshToken: refreshToken }
			).subscribe((tokens:IAuthResponse)=>{
        this.saveTokens(tokens);
      });
		}
		return this.router.navigate(['/login']);
	}

	saveTokens(tokens: IAuthResponse) {
		localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
	}

	getAccessToken(): string {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
		if (accessToken) {
			return accessToken;
		} else {
      this.refreshToken();
			return '';
		}
	}
}
