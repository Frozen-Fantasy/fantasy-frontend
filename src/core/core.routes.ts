import { Routes } from '@angular/router';
import { CoreComponent } from './core.component';

export const coreRoutes: Routes = [
    {
        path: '', component: CoreComponent,
        children: [
            {
                path: 'tournaments',
                loadChildren: () => import('../tournaments/tournaments.routes').then(mod => mod.tournamentsRoutes)
            },
            {
                path: 'my-tournaments',
                loadChildren: () => import('../my-tournaments/my-tournaments.routes').then(mod => mod.MyTournamentsRoutes)
            },
            {
                path: 'rating',
                loadChildren: () => import('../rating/rating.routes').then(mod => mod.ratingRoutes)
            },
            {
                path: 'gallery',
                loadChildren: () => import('../gallery/gallery.routes').then(mod => mod.galleryRoutes)
            },
            {
                path: 'rules',
                loadChildren: () => import('../rules/rules.routes').then(mod => mod.rulesRoutes)
            }
        ]
    }
];