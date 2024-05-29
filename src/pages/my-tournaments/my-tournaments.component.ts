import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTournament, TournamentsFilterComponent } from 'src/ui/tournaments/tournaments-filter/tournaments-filter.component';
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
	filterChange$ = new BehaviorSubject<FilterTournament>({ khlLeague: true, nhlLeague: true, active: false, finished: false, sheduled: false });

	tournaments$: Observable<ITournament[]> = combineLatest([this.tournamentsService.mytournaments$, this.filterChange$]).pipe(
		map(([tournaments, filter]) => {
			return { tournaments: this.filterLeague(tournaments, filter), filter: filter };
		}),
		map(({ tournaments, filter }) => {
			return this.filterStatuses(tournaments, filter);
		})
	);


	constructor(private readonly router: Router, private readonly tournamentsService: TournamentsService) {
		this.tournamentsService.getMyTournaments();

	}

	onFilterChange(value: FilterTournament) {
		this.filterChange$.next(value)
	}

	onEditTeam(event: MouseEvent, tournamentId: number) {
		event.stopPropagation();
		event.preventDefault();
		this.router.navigate([`tournaments/attend/${tournamentId}/true`]);
	}

	onTournamentClick(tournamentId: number) {
		this.router.navigate([`tournaments/${tournamentId}`]);
	}

	filterLeague(tournaments: ITournament[], filter: FilterTournament): ITournament[] {
		if (!filter.khlLeague && !filter.nhlLeague) {
			return tournaments;
		}
		return tournaments.filter((tournament) => {
			const tournamentLeague = tournament.league;
			if (tournamentLeague === HockeyLeague.KHL) {
				return filter.khlLeague;
			}
			if (tournamentLeague === HockeyLeague.NHL) {
				return filter.nhlLeague;
			}
			return false;
		})
	}

	filterStatuses(tournaments: ITournament[], filter: FilterTournament): ITournament[] {
		if (!filter.active && !filter.finished && !filter.sheduled) {
			return tournaments;
		}
		return tournaments.filter((tournament) => {
			const tournamentStatus = tournament.statusTournament;
			if (tournamentStatus === 'finished') {
				return filter.finished;
			}
			if (tournamentStatus === 'not_yet_started') {
				return filter.sheduled;
			}
			if (tournamentStatus === 'started') {
				return filter.active;
			}
			if (tournamentStatus === 'active') {
				return filter.active;
			}
			return false;
		})
	}

	onCheckResults(event: MouseEvent, tournamentId: number) {
		event.stopPropagation();
		event.preventDefault();
		this.router.navigate([`/tournaments/results/${tournamentId}`]);
	}
}
