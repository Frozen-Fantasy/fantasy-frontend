import { Route } from '@angular/router';
import { LoginComponent } from 'src/pages/login/login.component';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('../core/core.routes').then((mod) => mod.coreRoutes)
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
