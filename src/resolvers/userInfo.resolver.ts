import { Injectable, inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserInfo } from 'src/core/interfaces';
import { UserService } from 'src/services/auth/user.service';

export const userInfoResolver: ResolveFn<IUserInfo> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    return inject(UserService).getUserInfo();
};