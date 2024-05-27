import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'frozen-fantasy-user-tournament-result',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './user-tournament-result.component.html',
	styleUrl: './user-tournament-result.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTournamentResultComponent {}
