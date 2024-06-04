import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../kit/button/button.component";
import { IPlayerCard, PlayerPosition, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
	selector: 'frozen-fantasy-player-pick',
	standalone: true,
	templateUrl: './player-pick.component.html',
	styleUrl: './player-pick.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ButtonComponent, TuiSvgModule]
})
export class PlayerPickComponent {
	positionsMap: { [k in PlayerPosition]: string } = {
		1: 'В',
		2: 'З',
		3: 'Н'
	};
	@Input() pickedPlayer: IPlayerCard | null = null;
	@Input() position!: PlayerPositionName;
	@Output() filterByPosition = new EventEmitter<void>();
	@Output() unPickPlayer = new EventEmitter<IPlayerCard>();
	onFilterPosition() {
		this.filterByPosition.emit();
	}
	onUnpick() {
		if (this.pickedPlayer) {
			this.unPickPlayer.emit(this.pickedPlayer);
		}
	}
}
