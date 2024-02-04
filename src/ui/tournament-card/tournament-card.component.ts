import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITournament } from 'src/pages/tournaments/interfaces';
import { CoinsComponent } from '../coins/coins.component';

@Component({
	selector: 'frozen-fantasy-tournament-card',
	standalone: true,
	imports: [CommonModule,CoinsComponent],
	templateUrl: './tournament-card.component.html',
	styleUrl: './tournament-card.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentCardComponent {
	@Input() tournament: ITournament | undefined;
}
