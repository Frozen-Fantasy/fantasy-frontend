import { ApplicationConfig, forwardRef, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from 'src/ui/kit/input/input.component';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withComponentInputBinding()), provideHttpClient(withInterceptors([AuthInterceptor])), provideAnimations(), importProvidersFrom(
    TuiRootModule,
  ),],
};
