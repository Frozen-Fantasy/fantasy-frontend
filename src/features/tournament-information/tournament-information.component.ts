import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HockeyLeague, IMatch, ITournament } from 'src/pages/tournaments/interfaces';
import { TournamentsService } from 'src/services/tournaments.service';
import { LeagueIconComponent } from 'src/ui/kit/league-icon/league-icon.component';
import { ScheduleTableComponent } from 'src/ui/tournaments/schedule-table/schedule-table.component';
import { Observable, Subject, map, of, takeUntil, tap } from 'rxjs';
import { LetDirective } from 'src/utils/directives/ngLet.directive';

const TOURNAMENT_NAME_KEY = 'TOURNAMENT_NAME';
const TOURNAMENT_LEAGUE_KEY = 'TOURNAMENT_LEAGUE';
@Component({
	selector: 'frozen-fantasy-tournament-information',
	standalone: true,
	imports: [CommonModule, LeagueIconComponent, ScheduleTableComponent, LetDirective],
	providers: [],
	templateUrl: './tournament-information.component.html',
	styleUrl: './tournament-information.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentInformationComponent implements OnInit, OnDestroy {
	tournament: ITournament | undefined;
	destroy$ = new Subject();
	matches: IMatch[] = [];
	@Input('id') id: any;

	constructor(private readonly tournamentsService: TournamentsService, private cdr: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this.id = parseInt(this.id);
		this.tournamentsService.tournaments$.pipe(
			takeUntil(this.destroy$),
			map(tournaments => tournaments.find(tournament => {
				console.log(tournament.tournamentId, this.id as number);
				localStorage.setItem(TOURNAMENT_NAME_KEY, tournament.title);
				localStorage.setItem(TOURNAMENT_LEAGUE_KEY, tournament.league.toString());
				return tournament.tournamentId === this.id;
			})),
		).subscribe((tournament) => this.tournament = tournament);
		this.tournamentsService.getMatches(this.id).subscribe(matches => {
			this.matches = [...matches];
			this.cdr.detectChanges();
		});
		if (!this.tournament) {
			this.tournament = {} as ITournament;
			this.tournament['title'] = localStorage.getItem(TOURNAMENT_NAME_KEY) ?? '';
			this.tournament['league'] = localStorage.getItem(TOURNAMENT_LEAGUE_KEY) === HockeyLeague.KHL.toString() ? 2 : 1;
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
	}
}
