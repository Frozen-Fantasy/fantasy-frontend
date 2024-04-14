import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { IUserInfo } from "src/core/interfaces";
import { BASE_API_URL, IAuthResponse } from "src/utils/dto";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient, private router: Router) {

    }

    getUserInfo(): Observable<IUserInfo> {
        return this.http.get<IUserInfo>(`${BASE_API_URL}/user/info`);
    }
}