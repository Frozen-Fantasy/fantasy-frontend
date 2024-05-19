import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPlayer, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { CoinsComponent } from '../kit/coins/coins.component';
import { ButtonComponent } from '../kit/button/button.component';

@Component({
	selector: 'frozen-fantasy-players-pick-list',
	standalone: true,
	imports: [CommonModule, CoinsComponent, ButtonComponent],
	templateUrl: './players-pick-list.component.html',
	styleUrl: './players-pick-list.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersPickListComponent {
	@Input() players: IPlayer[] | null = [];
	@Input() pickedPlayers!: { [key in PlayerPositionName]: IPlayer[] | null[] };
	@Output() playerPick = new EventEmitter<IPlayer>();
	onPlayerPick(player: IPlayer): void {
		this.playerPick.emit(player);
	}
	isPlayerPicked(player: IPlayer): boolean {
		return !!this.pickedPlayers[player.positionName].find(pickedPlayer => pickedPlayer?.id === player.id);
	}
}
