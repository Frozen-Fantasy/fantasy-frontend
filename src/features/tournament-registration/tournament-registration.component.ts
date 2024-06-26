import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerPickComponent } from 'src/ui/player-pick/player-pick.component';
import { IPlayer, IPlayerCard, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { TournamentsService } from 'src/services/tournaments.service';
import { PlayersPickListComponent } from 'src/ui/players-pick-list/players-pick-list.component';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, startWith, take, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ButtonComponent } from 'src/ui/kit/button/button.component';
import { CoinsComponent } from 'src/ui/kit/coins/coins.component';
import { FilterPlayersComponent, IFilterPlayer } from 'src/ui/filter-players/filter-players.component';

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
	initialPlayers: IPlayerCard[] = [];
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
	pickedPlayers: { [key in PlayerPositionName]: IPlayerCard[] | null[] } = {
		'Вратарь': [null],
		'Защитник': [null, null],
		'Нападающий': [null, null, null],
	};
	players$ = new BehaviorSubject<IPlayerCard[]>([]);
	destroy$ = new Subject<any>();

	get initialFilterPlayers(): IFilterPlayer[] {
		return this.initialPlayers.map(player => ({
			id: player.id,
			leagueName: player.leagueName,
			positionName: player.positionName,
			name: player.name
		} as IFilterPlayer))
	}
	constructor(private tournamentService: TournamentsService, private readonly cdr: ChangeDetectorRef) {
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
					this.players$.next(this.filterByPosition(this.initialPlayers));
				})).subscribe();
		if (this.edit) {
			this.tournamentService.getMyTeam(this.id).pipe(take(1)).subscribe(
				value => {
					value.players.forEach(player => this.onPlayerPick(player));
					this.cdr.detectChanges();
				}
			);
		}
	};

	ngOnDestroy(): void {
		this.destroy$.next(true);
	}

	selectPosition(position: PlayerPositionName) {
		this.selectedPosition.setValue(position);
	}

	onPlayerPick(player: IPlayerCard): void {
		const playerIndex = this.nextIndex[player.positionName];
		if (this.pickedPlayers[player.positionName][playerIndex]) {
			this.budget += this.pickedPlayers[player.positionName][playerIndex]?.playerCost ?? 0;
		}
		if (this.budget > player.playerCost! && this.playerNotPicked(player)) {
			this.pickedPlayers[player.positionName][playerIndex] = player;
			this.nextIndex[player.positionName] += 1;
			if (this.nextIndex[player.positionName] > this.maxIndex[player.positionName]) {
				this.nextIndex[player.positionName] = 0;
			}
			this.budget -= player.playerCost!;
		}
	}

	unPickPlayer(player: IPlayerCard): void {
		const playerIndex = this.pickedPlayers[player.positionName].findIndex(curPlayer => curPlayer?.id === player?.id)
		this.pickedPlayers[player.positionName][playerIndex] = null;
		this.nextIndex[player.positionName] = playerIndex;
		this.budget += player?.playerCost ?? 0;
	}

	filterByPosition(players: IPlayerCard[]): IPlayerCard[] {
		if (this.selectedPosition.value) {
			return players.filter(player => player.positionName === this.selectedPosition.value);
		}
		return players;
	}

	submitPick() {
		if (!this.pickedPlayers['Вратарь'].filter(player => !player).length &&
			!this.pickedPlayers['Защитник'].filter(player => !player).length &&
			!this.pickedPlayers['Нападающий'].filter(player => !player).length) {

			const pickedPlayers = this.pickedPlayers as ({ [key in PlayerPositionName]: IPlayerCard[] });
			const finalPick = (Object.keys(pickedPlayers) as PlayerPositionName[]).map((position: PlayerPositionName) => pickedPlayers[position].map((player) => player.id)).reduce((playersIds, final) => final.concat(playersIds));
			if (this.edit) {
				this.tournamentService.updateTeamForTournament(this.id, finalPick);
			}
			else {
				this.tournamentService.registerTeamForTournament(this.id, finalPick);
			}
		}

	}

	playerNotPicked(player: IPlayerCard): boolean {
		return !this.pickedPlayers[player.positionName].map(player => player?.id).includes(player.id);
	}

	onFilterPlayers(playerIds: number[]) {
		const filteredPlayers: IPlayerCard[] = [];
		playerIds.forEach(id => {
			const findPlayer = this.initialPlayers.find(player => {
				return player.id === id;
			});
			if (findPlayer) {
				filteredPlayers.push(findPlayer);
			}
		});
		this.players$.next(filteredPlayers);
	}
}
