import { Routes } from '@angular/router';
import { CoreComponent } from './core.component';

export const coreRoutes: Routes = [
    {
        path: '', component: CoreComponent,
        children: [
            {
                path: 'tournaments',
                loadChildren: () => import('../pages/tournaments/tournaments.routes').then(mod => mod.tournamentsRoutes)
            },
            {
                path: 'my-tournaments',
                loadChildren: () => import('../pages/my-tournaments/my-tournaments.routes').then(mod => mod.MyTournamentsRoutes)
            },
            {
                path: 'rating',
                loadChildren: () => import('../pages/rating/rating.routes').then(mod => mod.ratingRoutes)
            },
            {
                path: 'gallery',
                loadChildren: () => import('../pages/gallery/gallery.routes').then(mod => mod.galleryRoutes)
            },
            {
                path: 'shop',
                loadChildren: () => import('../pages/shop/shop.routes').then(mod => mod.shopRoutes)
            },
            {
                path: "**",
                redirectTo: 'tournaments'
            }
        ]
    },
];