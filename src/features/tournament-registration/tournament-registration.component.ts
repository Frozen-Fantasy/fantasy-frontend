import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerPickComponent } from 'src/ui/player-pick/player-pick.component';
import { IPlayer, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { TournamentsService } from 'src/services/tournaments.service';
import { PlayersPickListComponent } from 'src/ui/players-pick-list/players-pick-list.component';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ButtonComponent } from 'src/ui/kit/button/button.component';
import { CoinsComponent } from 'src/ui/kit/coins/coins.component';

@Component({
	selector: 'frozen-fantasy-tournament-registration',
	standalone: true,
	imports: [CommonModule, PlayerPickComponent, PlayersPickListComponent, ButtonComponent, CoinsComponent],
	templateUrl: './tournament-registration.component.html',
	styleUrl: './tournament-registration.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentRegistrationComponent implements OnInit {
	@Input('id') id: number = 0;
	@Input('edit') edit: boolean = false;
	budget: number = 100;
	selectedPosition = new FormControl<PlayerPositionName | null>(null);
	maxIndex: { [key in PlayerPositionName]: number } = {
		'Вратарь': 0,
		'Защитник': 1,
		'Нападающий': 2,
	};
	nextIndex: { [key in PlayerPositionName]: number } = {
		'Вратарь': 0,
		'Защитник': 0,
		'Нападающий': 0,
	};
	pickedPlayers: { [key in PlayerPositionName]: IPlayer[] | null[] } = {
		'Вратарь': [null],
		'Защитник': [null, null],
		'Нападающий': [null, null, null],
	};
	players$: Observable<IPlayer[]> | undefined;
	constructor(private tournamentService: TournamentsService) {
	}
	ngOnInit() {
		this.players$ = combineLatest([
			this.tournamentService.getTournamentRoster(this.id),
			this.selectedPosition.valueChanges.pipe(startWith(null))
		]).pipe(
			map(([players,]) => {
				return this.filterByPosition(players);
			}));
		if (this.edit) {
			this.tournamentService.getMyTeam(this.id).subscribe(value =>
				value.players.forEach(player => this.onPlayerPick(player))
			);
		}
	};

	selectPosition(position: PlayerPositionName) {
		this.selectedPosition.setValue(position);
	}

	onPlayerPick(player: IPlayer): void {
		if (this.budget > player.playerCost!) {
			const playerIndex = this.nextIndex[player.positionName];
			this.pickedPlayers[player.positionName][playerIndex] = player;
			this.nextIndex[player.positionName] += 1;
			if (this.nextIndex[player.positionName] > this.maxIndex[player.positionName]) {
				this.nextIndex[player.positionName] = 0;
			}
			this.budget -= player.playerCost!;
		}
	}

	filterByPosition(players: IPlayer[]): IPlayer[] {
		if (this.selectedPosition.value) {
			return players.filter(player => player.positionName === this.selectedPosition.value);
		}
		return players;
	}

	submitPick() {
		if (!this.pickedPlayers['Вратарь'].filter(player => !player).length &&
			!this.pickedPlayers['Защитник'].filter(player => !player).length &&
			!this.pickedPlayers['Нападающий'].filter(player => !player).length) {

			const pickedPlayers = this.pickedPlayers as ({ [key in PlayerPositionName]: IPlayer[] });
			const finalPick = (Object.keys(pickedPlayers) as PlayerPositionName[]).map((position: PlayerPositionName) => pickedPlayers[position].map((player) => player.id)).reduce((playersIds, final) => final.concat(playersIds));
			if (this.edit) {
				this.tournamentService.updateTeamForTournament(this.id, finalPick);
			}
			else {
				this.tournamentService.registerTeamForTournament(this.id, finalPick);
			}
		}

	}

}
