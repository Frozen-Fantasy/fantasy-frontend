import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ITournament } from 'src/pages/tournaments/interfaces';
import { TournamentsService } from 'src/services/tournaments.service';
import { TournamentCardComponent } from 'src/ui/tournament-card/tournament-card.component';
import { LeagueIconComponent } from 'src/ui/kit/league-icon/league-icon.component';
import { ScheduleTableComponent } from 'src/ui/schedule-table/schedule-table.component';

@Component({
	selector: 'frozen-fantasy-tournament-information',
	standalone: true,
	imports: [CommonModule, TournamentCardComponent, LeagueIconComponent, ScheduleTableComponent],
	providers: [],
	templateUrl: './tournament-information.component.html',
	styleUrl: './tournament-information.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentInformationComponent implements OnInit {
	tournament:ITournament|undefined;
	@Input('id') id:number = 0;

	constructor(private readonly tournamentsService:TournamentsService){

	}
	ngOnInit(): void {
		this.tournament = this.tournamentsService.mockTournaments.find(tournament=>{
			return tournament.id==this.id;
		});
	}
}
