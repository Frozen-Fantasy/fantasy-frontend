import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { IMatch, ITournament } from 'src/pages/tournaments/interfaces';
import { TournamentsService } from 'src/services/tournaments.service';
import { TournamentCardComponent } from 'src/ui/tournaments/tournament-card/tournament-card.component';
import { LeagueIconComponent } from 'src/ui/kit/league-icon/league-icon.component';
import { ScheduleTableComponent } from 'src/ui/tournaments/schedule-table/schedule-table.component';
import { Observable, Subject, map, of, takeUntil, tap } from 'rxjs';
import { LetDirective } from 'src/utils/directives/ngLet.directive';

@Component({
	selector: 'frozen-fantasy-tournament-information',
	standalone: true,
	imports: [CommonModule, TournamentCardComponent, LeagueIconComponent, ScheduleTableComponent, LetDirective],
	providers: [],
	templateUrl: './tournament-information.component.html',
	styleUrl: './tournament-information.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentInformationComponent implements OnInit, OnDestroy {
	tournament: ITournament | undefined;
	destroy$ = new Subject();
	matches: IMatch[] = [];
	@Input('id') id: number = 0;

	constructor(private readonly tournamentsService: TournamentsService, private cdr: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this.tournamentsService.tournaments$.pipe(
			takeUntil(this.destroy$),
			map(tournaments => tournaments.find(tournament => {
				return tournament.tournamentId == this.id;
			})),
		).subscribe((tournament) => this.tournament = tournament);
		this.tournamentsService.getMatches(this.id).subscribe(matches => {
			this.matches = [...matches];
			this.cdr.detectChanges();
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
	}
}
