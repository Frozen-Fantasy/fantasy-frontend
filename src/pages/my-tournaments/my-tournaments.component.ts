import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsFilterComponent } from 'src/ui/tournaments/tournaments-filter/tournaments-filter.component';
import { Router } from '@angular/router';
import { TournamentsService } from 'src/services/tournaments.service';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { ITournament, HockeyLeague } from '../tournaments/interfaces';
import { LeagueIconComponent } from 'src/ui/kit/league-icon/league-icon.component';
import { CoinsComponent } from 'src/ui/kit/coins/coins.component';
import { ButtonComponent } from 'src/ui/kit/button/button.component';
import { LetDirective } from 'src/utils/directives/ngLet.directive';

@Component({
	selector: 'frozen-fantasy-my-tournaments',
	standalone: true,
	imports: [CommonModule, TournamentsFilterComponent, LeagueIconComponent, CoinsComponent, LetDirective, ButtonComponent],
	templateUrl: './my-tournaments.component.html',
	styleUrl: './my-tournaments.component.less',
})
export class MyTournamentsComponent {
	filterChange$ = new BehaviorSubject<{ khlLeague?: boolean, nhlLeague?: boolean }>({ khlLeague: true, nhlLeague: true });

	tournaments$: Observable<ITournament[]> = combineLatest([this.tournamentsService.mytournaments$, this.filterChange$]).pipe(
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
		this.tournamentsService.getMyTournaments();

	}

	onFilterChange(value: Partial<{ khlLeague: boolean, nhlLeague: boolean }>) {
		this.filterChange$.next(value)
	}

	onPlay(event: MouseEvent, tournamentId: number) {
		event.stopPropagation();
		event.preventDefault();
		this.router.navigate([`tournaments/attend/${tournamentId}`]);
	}

	onTournamentClick(tournamentId: number) {
		this.router.navigate([`tournaments/${tournamentId}`]);
	}
}
