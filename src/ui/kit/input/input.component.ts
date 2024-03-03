import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor } from '@angular/forms';

@Component({
	selector: 'frozen-fantasy-input',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './input.component.html',
	styleUrl: './input.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
	value:string = '';
	visibility:boolean = false;
	@Input() isPassword:boolean=false;
	onChange = (_:any) => {};
	onBlur = (_:any) => {};

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onBlur = fn;
	}

	toggleVisibility(){
		this.visibility = !this.visibility;
	}
}
