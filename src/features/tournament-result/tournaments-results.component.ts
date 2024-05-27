import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTournamentResultComponent } from 'src/ui/user-tournament-result/user-tournament-result.component';
import { TournamentsService } from 'src/services/tournaments.service';
import { take } from 'rxjs';
import { ITournamentResult } from 'src/pages/tournaments/interfaces';

@Component({
	selector: 'frozen-fantasy-tournaments-results',
	standalone: true,
	imports: [CommonModule, UserTournamentResultComponent],
	templateUrl: './tournaments-results.component.html',
	styleUrl: './tournaments-results.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentsResultsComponent {
	@Input() id!: number;
	results: ITournamentResult[] = [];
	constructor(private tournamentsService: TournamentsService, private cdr: ChangeDetectorRef) {

	}
	ngOnInit() {
		this.tournamentsService.getTournamentsResults(this.id).pipe(take(1)).subscribe(results => {
			this.results = [...results];
			this.cdr.detectChanges();
		}
		)
	}
}
