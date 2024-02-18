import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'frozen-fantasy-coins',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './coins.component.html',
	styleUrl: './coins.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinsComponent {
	@Input() price:number|undefined;
}
