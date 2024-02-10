import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'frozen-fantasy-tournament-information',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './tournament-information.component.html',
	styleUrl: './tournament-information.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentInformationComponent {}
