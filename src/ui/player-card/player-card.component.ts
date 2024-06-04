import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPlayer, IPlayerCard, PlayerPosition, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { ButtonComponent } from '../kit/button/button.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { PopupComponent } from '../kit/popup/popup.component';
import { TuiHintModule } from '@taiga-ui/core';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { TuiHoveredModule } from '@taiga-ui/cdk';
import { GalleryService } from 'src/pages/gallery/gallery.service';
import { LetDirective } from 'src/utils/directives/ngLet.directive';
import { IPlayerResult } from 'src/pages/tournaments/interfaces';
export interface IPlayerSumStat {
	matchesCount: number;
	fantasyPoint: number,
	goals: number,
	assists: number,
	shots: number,
	pims: number,
	hits: number,
	saves: number,
	missedGoals: number,
	shutout: number,
	id: number
}
@Component({
	selector: 'frozen-fantasy-player-card',
	standalone: true,
	imports: [CommonModule, ButtonComponent, CdkOverlayOrigin, PopupComponent, TuiHintModule, TuiHoveredModule, LetDirective],
	templateUrl: './player-card.component.html',
	styleUrl: './player-card.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('unpackCard', [
			state('unpacked', style({
				opacity: 1,
			})),
			state('packed', style({
				opacity: 0.0,
			})),
			transition('packed => unpacked', [
				animate('1.5s')
			]),
		]),
	]
})
export class PlayerCardComponent {
	positionsMap: { [k in PlayerPosition]: string } = {
		1: 'В',
		2: 'З',
		3: 'Н'
	};
	@Input() player!: IPlayerCard;
	@Output() unpackPlayer = new EventEmitter<number>();
	isOpened = false;
	playerInfo$ = new Subject<IPlayerSumStat>();
	hovered$ = new Subject<number>();
	destroy$ = new Subject();
	constructor(private galleryService: GalleryService) {
		this.hovered$.pipe(
			takeUntil(this.destroy$),
			distinctUntilChanged(),
			debounceTime(1000)
		).subscribe((id: number) => {
			this.galleryService.getPlayerInfo(id).pipe(map(stats => {
				return {
					id: id,
					fantasyPoint: stats.reduce((acc, next) => acc + next.fantasyPoint, 0),
					goals: stats.reduce((acc, next) => acc + next.goals, 0),
					assists: stats.reduce((acc, next) => acc + next.assists, 0),
					shots: stats.reduce((acc, next) => acc + next.shots, 0),
					pims: stats.reduce((acc, next) => acc + next.pims, 0),
					hits: stats.reduce((acc, next) => acc + next.hits, 0),
					saves: stats.reduce((acc, next) => acc + next.saves, 0),
					missedGoals: stats.reduce((acc, next) => acc + next.missedGoals, 0),
					shutout: stats.reduce((acc, next) => acc + (next.shutout ? 1 : 0), 0),
					matchesCount: stats.length
				}
			})).subscribe(info => this.playerInfo$.next(info));
		})

	};
	onDestroy() {
		this.destroy$.next(true);
	}
	onUnpack() {
		this.unpackPlayer.emit(this.player.id);
	}

	onHovered(id: number) {
		this.hovered$.next(id)
	}

	getPosition(id: number): PlayerPositionName {
		return this.player.positionName;
	}
}
