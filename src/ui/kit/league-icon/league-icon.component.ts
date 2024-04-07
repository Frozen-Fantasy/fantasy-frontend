import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HockeyLeague } from 'src/pages/tournaments/interfaces';
export type iconSize = 's' | 'm' | 'l';
@Component({
	selector: 'frozen-fantasy-league-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './league-icon.component.html',
	styleUrl: './league-icon.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueIconComponent {
	leagues = HockeyLeague;
	@Input() league: HockeyLeague | undefined;
	@Input() size: iconSize = 'm';
}
