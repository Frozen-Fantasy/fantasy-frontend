import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCardComponent } from 'src/ui/tournament-card/tournament-card.component';
import { TournamentsFilterComponent } from 'src/ui/tournaments-filter/tournaments-filter.component';

@Component({
	selector: 'frozen-fantasy-tournamnets',
	standalone: true,
	imports: [CommonModule, TournamentCardComponent, TournamentsFilterComponent],
	templateUrl: './tournaments.component.html',
	styleUrl: './tournaments.component.less',
})
export class TournamentsComponent {
	mockTournaments = [
		{
			name: 'Турнир 1',
			startDate: new Date('2022-01-01'),
			participants: 25,
			contribution: 450,
			reward: 1500
		},
		{
			name: 'Турнир 2',
			startDate: new Date('2022-02-15'),
			participants: 12,
			contribution: 200,
			reward: 900
		},
		{
			name: 'Турнир 3',
			startDate: new Date('2022-03-10'),
			participants: 18,
			contribution: 300,
			reward: 1200
		},
		{
			name: 'Турнир 4',
			startDate: new Date('2022-04-22'),
			participants: 20,
			contribution: 350,
			reward: 1300
		},
		{
			name: 'Турнир 5',
			startDate: new Date('2022-05-05'),
			participants: 15,
			contribution: 250,
			reward: 1100
		},
		{
			name: 'Турнир 6',
			startDate: new Date('2022-06-18'),
			participants: 30,
			contribution: 500,
			reward: 2000
		},
		{
			name: 'Турнир 7',
			startDate: new Date('2022-07-01'),
			participants: 12,
			contribution: 200,
			reward: 900
		},
		{
			name: 'Турнир 8',
			startDate: new Date('2022-08-13'),
			participants: 24,
			contribution: 400,
			reward: 1400
		},
		{
			name: 'Турнир 9',
			startDate: new Date('2022-09-28'),
			participants: 16,
			contribution: 300,
			reward: 1200
		},
		{
			name: 'Турнир 10',
			startDate: new Date('2022-10-15'),
			participants: 22,
			contribution: 350,
			reward: 1300
		}
	]
}
