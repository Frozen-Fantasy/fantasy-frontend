import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCardComponent } from 'src/ui/tournament-card/tournament-card.component';
import { HockeyLeague, ITournament } from './interfaces';
import { Router } from '@angular/router';
import { TournamentsService } from 'src/services/tournaments.service';
import { TournamentsFilterComponent } from 'src/ui/tournaments-filter/tournaments-filter.component';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { LetDirective } from 'src/utils/directives/ngLet.directive';

@Component({
	selector: 'frozen-fantasy-tournamnets',
	standalone: true,
	imports: [CommonModule, TournamentCardComponent, TournamentsFilterComponent, LetDirective],
	templateUrl: './tournaments.component.html',
	styleUrl: './tournaments.component.less',
})
export class TournamentsComponent {
	filterChange$ = new BehaviorSubject<{ khlLeague?: boolean, nhlLeague?: boolean }>({ khlLeague: true, nhlLeague: true });

	tournaments$: Observable<ITournament[]> = combineLatest([this.tournamentsService.tournaments$, this.filterChange$]).pipe(
		map(([tournaments, filter]) => {
			return tournaments.filter(tournament => {
				const tournamentLeague = tournament.league;
				if (tournamentLeague === HockeyLeague.KHL) {
					return filter.khlLeague;
				}
				if (tournamentLeague === HockeyLeague.NHL) {
					return filter.nhlLeague;
				}
				return false;
			})
		})
	);


	constructor(private readonly router: Router, private readonly tournamentsService: TournamentsService) {
		this.tournamentsService.getAllTournaments();

	}

	onFilterChange(value: Partial<{ khlLeague: boolean, nhlLeague: boolean }>) {
		this.filterChange$.next(value)
	}
}
