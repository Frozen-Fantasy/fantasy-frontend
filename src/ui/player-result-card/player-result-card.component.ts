import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPlayerResult } from 'src/pages/tournaments/interfaces';

@Component({
	selector: 'frozen-fantasy-player-result-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './player-result-card.component.html',
	styleUrl: './player-result-card.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerResultCardComponent {
	@Input() playerResult!: IPlayerResult;
}
