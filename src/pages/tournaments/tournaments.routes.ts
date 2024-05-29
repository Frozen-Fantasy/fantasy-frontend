import { Routes } from "@angular/router";
import { TournamentsComponent } from "./tournaments.component";
import { TournamentInformationComponent } from "src/features/tournament-information/tournament-information.component";
import { TournamentRegistrationComponent } from "src/features/tournament-registration/tournament-registration.component";
import { TournamentsResultsComponent } from "src/features/tournament-result/tournaments-results.component";

export const tournamentsRoutes: Routes = [{
    path: 'attend/:id/:edit',
    component: TournamentRegistrationComponent
},
{
    path: 'results/:id',
    component: TournamentsResultsComponent
}, {
    path: ':id',
    component: TournamentInformationComponent
},
{
    path: '',
    component: TournamentsComponent,
}


];