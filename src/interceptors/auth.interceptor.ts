import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req:HttpRequest<any>, next) => {
  const authService:AuthService = inject(AuthService);

    const accessToken:string = authService.getAccessToken();

    if(!req.url.includes('/auth')){
      const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
      return next(authReq);
    }
    
    return next(req);
};
