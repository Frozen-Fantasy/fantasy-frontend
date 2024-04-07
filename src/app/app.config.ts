import { ApplicationConfig, forwardRef } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from 'src/ui/kit/input/input.component';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),provideHttpClient(withInterceptors([AuthInterceptor]))],
};
