import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCardComponent } from 'src/ui/tournament-card/tournament-card.component';
import { TournamentsFilterComponent } from 'src/ui/tournaments-filter/tournaments-filter.component';
import { ITournament } from './interfaces';
import { mockTournaments } from './mockTournaments';

@Component({
	selector: 'frozen-fantasy-tournamnets',
	standalone: true,
	imports: [CommonModule, TournamentCardComponent, TournamentsFilterComponent],
	templateUrl: './tournaments.component.html',
	styleUrl: './tournaments.component.less',
})
export class TournamentsComponent {
	tournaments:ITournament[]=mockTournaments;
	onFilterChange(value:Partial<{khlLeague:boolean,nhlLeague:boolean}>){
		this.tournaments = mockTournaments.filter(tournament=>{
			const tournamentLeague = tournament.league;
			if(tournamentLeague==='KHL'){
				return value.khlLeague;
			}
			if(tournamentLeague==='NHL'){
				return value.nhlLeague;
			}
			return false;
		})
	}
}
