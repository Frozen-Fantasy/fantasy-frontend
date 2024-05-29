import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPlayerCard, PlayerPosition } from 'src/pages/gallery/interfaces';
import { ButtonComponent } from '../kit/button/button.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'frozen-fantasy-player-card',
	standalone: true,
	imports: [CommonModule, ButtonComponent],
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

	constructor() {

	};
	onUnpack() {
		this.unpackPlayer.emit(this.player.id);
	}
}
