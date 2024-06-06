import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTournamentResultComponent } from 'src/ui/user-tournament-result/user-tournament-result.component';
import { TournamentsService } from 'src/services/tournaments.service';
import { take } from 'rxjs';
import { ITournamentResult } from 'src/pages/tournaments/interfaces';
import { UserService } from 'src/services/auth/user.service';
import { CoinsComponent } from 'src/ui/kit/coins/coins.component';

@Component({
	selector: 'frozen-fantasy-tournaments-results',
	standalone: true,
	imports: [CommonModule, UserTournamentResultComponent, CoinsComponent],
	templateUrl: './tournaments-results.component.html',
	styleUrl: './tournaments-results.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentsResultsComponent {
	@Input() id!: number;
	pickedResultId: number = 0;
	results: ITournamentResult[] = [];
	constructor(private tournamentsService: TournamentsService, private userSerice: UserService, private cdr: ChangeDetectorRef) {

	}
	ngOnInit() {
		this.tournamentsService.getTournamentsResults(this.id).pipe(take(1)).subscribe(results => {
			this.results = [...results];
			this.pickedResultId = this.results.findIndex(result => result.profileID === this.userSerice.userInfo.profileID);
			this.cdr.detectChanges();
		}
		)
	}
	pickResult(id: number) {
		this.pickedResultId = id;

		this.cdr.detectChanges();
	}
}
