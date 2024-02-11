import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITournament } from 'src/pages/tournaments/interfaces';
import { CoinsComponent } from '../coins/coins.component';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'frozen-fantasy-tournament-card',
	standalone: true,
	imports: [CommonModule,CoinsComponent, ButtonComponent, RouterLink],
	templateUrl: './tournament-card.component.html',
	styleUrl: './tournament-card.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentCardComponent {
	@Input() tournament: ITournament | undefined;
	onClick(event:MouseEvent){
		event.stopPropagation();
		event.preventDefault();
	}
}
