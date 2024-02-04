import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
	selector: 'frozen-fantasy-tournaments-filter',
	standalone: true,
	imports: [CommonModule, CheckboxComponent],
	templateUrl: './tournaments-filter.component.html',
	styleUrl: './tournaments-filter.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentsFilterComponent {}
