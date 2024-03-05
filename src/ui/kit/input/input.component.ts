import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'frozen-fantasy-input',
	standalone: true,
	imports: [CommonModule,FormsModule],
	templateUrl: './input.component.html',
	styleUrl: './input.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers:[{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => InputComponent),
		multi: true,
	  }]
})
export class InputComponent implements ControlValueAccessor {
	value:string = '';
	visibility:boolean = false;
	@Input() isPassword:boolean=false;
	onChange = (_:any) => {};
	onBlur = (_:any) => {};

	writeValue(value: string): void {
		console.log(value);
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
