import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPlayer, IPlayerCard, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { CoinsComponent } from '../kit/coins/coins.component';
import { ButtonComponent } from '../kit/button/button.component';
import { TuiHintModule } from '@taiga-ui/core';
import { Subject, takeUntil, distinctUntilChanged, debounceTime, map } from 'rxjs';
import { GalleryService } from 'src/pages/gallery/gallery.service';
import { IPlayerSumStat } from '../player-card/player-card.component';
import { LetDirective } from 'src/utils/directives/ngLet.directive';
import { TuiHoveredModule } from '@taiga-ui/cdk';

@Component({
	selector: 'frozen-fantasy-players-pick-list',
	standalone: true,
	imports: [CommonModule, CoinsComponent, ButtonComponent, TuiHintModule, LetDirective, TuiHoveredModule],
	templateUrl: './players-pick-list.component.html',
	styleUrl: './players-pick-list.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersPickListComponent {
	@Input() players: IPlayerCard[] | null = [];
	@Input() pickedPlayers!: { [key: string]: IPlayerCard[] | null[] };
	@Output() playerPick = new EventEmitter<IPlayerCard>();
	onPlayerPick(player: IPlayerCard): void {
		this.playerPick.emit(player);
	}
	isPlayerPicked(player: IPlayerCard): boolean {
		return !!this.pickedPlayers[player.positionName].find(pickedPlayer => pickedPlayer?.id === player.id);
	}
	playerInfo$ = new Subject<IPlayerSumStat>();
	hovered$ = new Subject<number>();
	destroy$ = new Subject();

	constructor(private galleryService: GalleryService) {
		this.hovered$.pipe(
			takeUntil(this.destroy$),
			distinctUntilChanged(),
			debounceTime(1000)
		).subscribe((id) => {
			this.galleryService.getPlayerInfo(id).pipe(map(stats => {
				return {
					fantasyPoint: stats.reduce((acc, next) => acc + next.fantasyPoint, 0),
					goals: stats.reduce((acc, next) => acc + next.goals, 0),
					assists: stats.reduce((acc, next) => acc + next.assists, 0),
					shots: stats.reduce((acc, next) => acc + next.shots, 0),
					pims: stats.reduce((acc, next) => acc + next.pims, 0),
					hits: stats.reduce((acc, next) => acc + next.hits, 0),
					saves: stats.reduce((acc, next) => acc + next.saves, 0),
					missedGoals: stats.reduce((acc, next) => acc + next.missedGoals, 0),
					shutout: stats.reduce((acc, next) => acc + (next.shutout ? 1 : 0), 0),
					matchesCount: stats.length,
					id: id
				}
			})).subscribe(info => this.playerInfo$.next(info));
		})

	};
	onHovered(id: number) {
		this.hovered$.next(id)
	}

	getPosition(id: number): PlayerPositionName {
		return this.players?.find(player => player.id === id)?.positionName ?? 'Нападающий';
	}
}
