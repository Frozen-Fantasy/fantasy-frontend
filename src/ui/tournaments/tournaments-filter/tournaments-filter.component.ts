import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../kit/checkbox/checkbox.component';

export interface FilterTournament {
	khlLeague: boolean, nhlLeague: boolean, active: boolean, finished: boolean, sheduled: boolean
}

@Component({
	selector: 'frozen-fantasy-tournaments-filter',
	standalone: true,
	imports: [CommonModule, CheckboxComponent, ReactiveFormsModule],
	templateUrl: './tournaments-filter.component.html',
	styleUrl: './tournaments-filter.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})


export class TournamentsFilterComponent implements OnInit {
	form = new FormGroup(
		{
			khlLeague: new FormControl<boolean>(true, { nonNullable: true }),
			nhlLeague: new FormControl<boolean>(true, { nonNullable: true }),
			active: new FormControl<boolean>(true, { nonNullable: true }),
			finished: new FormControl<boolean>(false, { nonNullable: true }),
			sheduled: new FormControl<boolean>(false, { nonNullable: true }),
		}
	);
	@Output() filterChange = new EventEmitter<FilterTournament>
	ngOnInit() {
		this.form.valueChanges.subscribe((value) => {
			this.filterChange.emit(value as FilterTournament);
		});
	}
}
