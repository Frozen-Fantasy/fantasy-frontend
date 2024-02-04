import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'frozen-fantasy-checkbox',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './checkbox.component.html',
	styleUrl: './checkbox.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
	@Input() text: string ='';
	@Input() disabled = false;

	isChecked = false;
	onChange = (_:any) => {};
	onBlur = (_:any) => {};

	writeValue(value: boolean): void {
		this.isChecked = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onBlur = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	onChanged($event:any) {
		this.isChecked = $event && $event.target && $event.target.checked;
		this.onChange(this.isChecked);
	}
}
