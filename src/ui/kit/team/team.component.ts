import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITeam } from 'src/pages/tournaments/interfaces';

@Component({
	selector: 'frozen-fantasy-team',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './team.component.html',
	styleUrl: './team.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
	@Input() team: string = '';
	@Input() home: boolean = true;
	@Input() logo: string = '';
}
