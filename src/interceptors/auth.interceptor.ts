import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/services/auth/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const accessToken: string = authService.getAccessToken();

  if (!req.url.includes('/auth')) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    return next(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return authService.refreshAccessToken().pipe(
            switchMap((response) => {
              if (response && response.accessToken) {
                authService.saveTokens(response);
                const newReq = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${authService.getAccessToken()}`)
                });
                return next(newReq);
              } else {
                router.navigate(['/login']);
                return throwError('Failed to refresh token');
              }
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

  return next(req);
};
