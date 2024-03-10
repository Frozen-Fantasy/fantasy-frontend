import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { BASE_API_URL, IAuthResponse } from "src/utils/dto";

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient, private router: Router) {
		
	}

    getUserInfo():Observable<any>{
        return this.http.get(`${BASE_API_URL}/user/info`);
    }
}