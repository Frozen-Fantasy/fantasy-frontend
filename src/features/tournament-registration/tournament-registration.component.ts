import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerPickComponent } from 'src/ui/player-pick/player-pick.component';
import { IPlayer, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { TournamentsService } from 'src/services/tournaments.service';
import { PlayersPickListComponent } from 'src/ui/players-pick-list/players-pick-list.component';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'frozen-fantasy-tournament-registration',
	standalone: true,
	imports: [CommonModule, PlayerPickComponent, PlayersPickListComponent],
	templateUrl: './tournament-registration.component.html',
	styleUrl: './tournament-registration.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentRegistrationComponent implements OnInit {
	@Input('id') id: number = 0;
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
	};

	selectPosition(position: PlayerPositionName) {
		this.selectedPosition.setValue(position);
	}

	onPlayerPick(player: IPlayer): void {
		const playerIndex = this.nextIndex[player.positionName];
		this.pickedPlayers[player.positionName][playerIndex] = player;
		this.nextIndex[player.positionName] += 1;
		if (this.nextIndex[player.positionName] > this.maxIndex[player.positionName]) {
			this.nextIndex[player.positionName] = 0;
		}

	}

	filterByPosition(players: IPlayer[]): IPlayer[] {
		if (this.selectedPosition.value) {
			return players.filter(player => player.positionName === this.selectedPosition.value);
		}
		return players;
	}

}
