import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { IPlayer, PlayerPositionName } from 'src/pages/gallery/interfaces';
import { CheckboxComponent } from '../kit/checkbox/checkbox.component';
import { MatSelectModule } from '@angular/material/select';
import { InputComponent } from '../kit/input/input.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'frozen-fantasy-filter-players',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatFormField, MatLabel, MatOption, CheckboxComponent, MatSelectModule, InputComponent],
	templateUrl: './filter-players.component.html',
	styleUrl: './filter-players.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPlayersComponent implements OnInit, OnDestroy {
	form = new FormGroup({
		position: new FormControl(''),
		name: new FormControl(''),
		khlLeague: new FormControl<boolean>(true, { nonNullable: true }),
		nhlLeague: new FormControl<boolean>(true, { nonNullable: true })
	})
	destroy$ = new Subject();
	@Input() initialPlayers: IPlayer[] = [];

	@Output() filteredPlayers = new EventEmitter<IPlayer[]>();

	ngOnInit() {
		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(formValue => {
			this.filterPlayers();
		})
	}

	ngOnDestroy() {
		this.destroy$.next(true);
	}

	positions: PlayerPositionName[] = ['Вратарь', 'Защитник', 'Нападающий'];

	filterPlayers() {
		const filteredByLeague = this.initialPlayers.filter(player => {
			if (player.leagueName === 'NHL') {
				return this.form.get('nhlLeague')?.value;
			}
			if (player.leagueName === 'KHL') {
				return this.form.get('khlLeague')?.value;
			}
			return false;
		});

		const filteredByName = filteredByLeague.filter(player => {
			return player.name.toLowerCase().trim().includes(this.form.get('name')?.value?.trim() ?? '');
		});

		const filteredByPosition = filteredByName.filter(player => {
			return this.form.get('position')?.value ? player.positionName === this.form.get('position')?.value : true;
		})

		this.filteredPlayers.emit(filteredByPosition);
	}
}
