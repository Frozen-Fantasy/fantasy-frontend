import { ApplicationConfig, forwardRef } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from 'src/ui/kit/input/input.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),provideHttpClient(),],
};
