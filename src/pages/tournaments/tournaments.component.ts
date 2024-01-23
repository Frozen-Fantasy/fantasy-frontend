import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCardComponent } from 'src/ui/tournament-card/tournament-card.component';
import { ITournament } from './interfaces';
import { Router } from '@angular/router';
import { TournamentsService } from 'src/services/tournaments.service';
import { TournamentsFilterComponent } from 'src/ui/tournaments-filter/tournaments-filter.component';

@Component({
	selector: 'frozen-fantasy-tournamnets',
	standalone: true,
	imports: [CommonModule, TournamentCardComponent, TournamentsFilterComponent],
	templateUrl: './tournaments.component.html',
	styleUrl: './tournaments.component.less',
})
export class TournamentsComponent {
	tournaments: ITournament[] = this.tournamentsService.mockTournaments;

	constructor(private readonly router: Router, private readonly tournamentsService: TournamentsService) {

	}

	onFilterChange(value: Partial<{ khlLeague: boolean, nhlLeague: boolean }>) {
		this.tournaments = this.tournamentsService.mockTournaments.filter(tournament => {
			const tournamentLeague = tournament.league;
			if (tournamentLeague === 'KHL') {
				return value.khlLeague;
			}
			if (tournamentLeague === 'NHL') {
				return value.nhlLeague;
			}
			return false;
		})
	}
}
