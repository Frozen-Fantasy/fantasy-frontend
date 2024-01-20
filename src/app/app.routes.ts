import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('../core/core.routes').then((mod) => mod.coreRoutes)
    }
];
