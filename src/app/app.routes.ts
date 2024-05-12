import { Route } from '@angular/router';
import { LoginComponent } from 'src/pages/login/login.component';
import { userInfoResolver } from 'src/resolvers/userInfo.resolver';

export const appRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        loadChildren: () => import('../core/core.routes').then((mod) => mod.coreRoutes),
        resolve: [userInfoResolver]
    }
];
