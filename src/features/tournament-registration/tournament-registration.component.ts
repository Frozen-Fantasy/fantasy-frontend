import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerPickComponent } from 'src/ui/player-pick/player-pick.component';
import { IPlayer, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { TournamentsService } from 'src/services/tournaments.service';
import { PlayersPickListComponent } from 'src/ui/players-pick-list/players-pick-list.component';
import { BehaviorSubject, Observable, Subject, combineLatest, map, startWith, take, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ButtonComponent } from 'src/ui/kit/button/button.component';
import { CoinsComponent } from 'src/ui/kit/coins/coins.component';
import { FilterPlayersComponent } from 'src/ui/filter-players/filter-players.component';

@Component({
	selector: 'frozen-fantasy-tournament-registration',
	standalone: true,
	imports: [CommonModule, PlayerPickComponent, PlayersPickListComponent, ButtonComponent, CoinsComponent, FilterPlayersComponent],
	templateUrl: './tournament-registration.component.html',
	styleUrl: './tournament-registration.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentRegistrationComponent implements OnInit, OnDestroy {
	@Input('id') id: number = 0;
	@Input('edit') edit: string | boolean | undefined;
	budget: number = 100;
	selectedPosition = new FormControl<PlayerPositionName | null>(null);
	initialPlayers: IPlayer[] = [];
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
	players$ = new BehaviorSubject<IPlayer[]>([]);
	destroy$ = new Subject<any>();
	constructor(private tournamentService: TournamentsService) {
	}
	ngOnInit() {
		this.edit = this.edit === 'true';
		this.tournamentService.getTournamentRoster(this.id).pipe(take(1)).subscribe(
			(players) => {
				this.players$.next(players);
				this.initialPlayers = players;
			}
		)
		this.selectedPosition.valueChanges.pipe(startWith(null))
			.pipe(
				takeUntil(this.destroy$),
				map(() => {
					return this.filterByPosition(this.players$.value);
				})).subscribe();
		if (this.edit) {
			this.tournamentService.getMyTeam(this.id).pipe(take(1)).subscribe(
				value => value.players.forEach(player => this.onPlayerPick(player))
			);
		}
	};

	ngOnDestroy(): void {
		this.destroy$.next(true);
	}

	selectPosition(position: PlayerPositionName) {
		this.selectedPosition.setValue(position);
	}

	onPlayerPick(player: IPlayer): void {
		if (this.budget > player.playerCost! && this.playerNotPicked(player)) {
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

	playerNotPicked(player: IPlayer): boolean {
		return !this.pickedPlayers[player.positionName].map(player => player?.id).includes(player.id);
	}

	onFilterPlayers(players: IPlayer[]) {
		this.players$.next(players);
	}
}
