import { Routes } from "@angular/router";
import { TournamentsComponent } from "./tournaments.component";
import { TournamentInformationComponent } from "src/features/tournament-information/tournament-information.component";

export const tournamentsRoutes: Routes = [
    {
        path: '',
        component: TournamentsComponent,
    },
    {
        path: ':id',
        component: TournamentInformationComponent
    }
];