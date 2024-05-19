import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../kit/button/button.component";
import { IPlayer, PlayerPosition, PlayerPositionName } from 'src/pages/gallery/interfaces';

@Component({
	selector: 'frozen-fantasy-player-pick',
	standalone: true,
	templateUrl: './player-pick.component.html',
	styleUrl: './player-pick.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ButtonComponent]
})
export class PlayerPickComponent {
	// unknownPlayer= '../../';
	positionsMap: { [k in PlayerPosition]: string } = {
		1: 'В',
		2: 'З',
		3: 'Н'
	};
	@Input() pickedPlayer: IPlayer | null = null;
	@Input() position!: PlayerPositionName;
	@Output() filterByPosition = new EventEmitter<void>();
	onFilterPosition() {
		this.filterByPosition.emit();
	}
}
