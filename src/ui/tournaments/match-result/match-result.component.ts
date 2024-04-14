import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMatch, StatusMap } from 'src/pages/tournaments/interfaces';

@Component({
	selector: 'frozen-fantasy-match-result',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './match-result.component.html',
	styleUrl: './match-result.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchResultComponent {
	statusMap = StatusMap;
	@Input() match:IMatch|undefined;
}
