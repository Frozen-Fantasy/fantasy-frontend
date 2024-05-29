import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsService } from 'src/services/tournaments.service';
import { IPlayerResult } from 'src/pages/tournaments/interfaces';
import { PlayerPickComponent } from '../player-pick/player-pick.component';
import { IPlayerCard, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { Observable } from 'rxjs';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PlayerResultCardComponent } from '../player-result-card/player-result-card.component';

@Component({
	selector: 'frozen-fantasy-user-tournament-result',
	standalone: true,
	imports: [CommonModule, PlayerResultCardComponent],
	templateUrl: './user-tournament-result.component.html',
	styleUrl: './user-tournament-result.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTournamentResultComponent {
	@Input() teamResult!: IPlayerResult[];
	constructor(private tournamentsService: TournamentsService) {
	}
}
