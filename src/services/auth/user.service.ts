import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, tap } from "rxjs";
import { IUserInfo } from "src/core/interfaces";
import { BASE_API_URL, IAuthResponse } from "src/utils/dto";
export interface ITransaction {
    amount: number,
    id: number,
    profileID: string,
    status: string,
    transactionDate: string,
    transactionDetails: string
}
@Injectable({
    providedIn: 'root',
})
export class UserService {
    userInfo!: IUserInfo;
    constructor(private http: HttpClient, private router: Router) {

    }

    getUserInfo() {
        return this.http.get<IUserInfo>(`${BASE_API_URL}/user/info`).pipe(tap(info => this.userInfo = info));
    }

    getTransactions() {
        return this.http.get<ITransaction[]>(`${BASE_API_URL}/user/transactions`);
    }
}