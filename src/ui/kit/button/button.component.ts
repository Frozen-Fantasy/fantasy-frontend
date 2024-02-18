import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'frozen-fantasy-button',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './button.component.html',
	styleUrl: './button.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
	@Input() appearance:"primary"|"secondary" = 'primary';
}
