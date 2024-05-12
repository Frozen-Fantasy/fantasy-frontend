import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMatch } from 'src/pages/tournaments/interfaces';
import { TeamComponent } from '../../kit/team/team.component';
import { MatchResultComponent } from '../match-result/match-result.component';

@Component({
	selector: 'frozen-fantasy-schedule-table',
	standalone: true,
	imports: [CommonModule, TeamComponent, MatchResultComponent],
	templateUrl: './schedule-table.component.html',
	styleUrl: './schedule-table.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleTableComponent {
	@Input() matches: IMatch[] | null = [];

}
