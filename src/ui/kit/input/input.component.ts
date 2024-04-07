import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

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
	@Input() visibility:boolean = false;
	@Input() isPassword:boolean = false;

	@Input()
	public label!: string;

	public value: string = '';

	public changed: ( value: string ) => void = ()=>{};

	public touched!: () => void;

	public isDisabled!: boolean;


	constructor () { }


	public writeValue ( value: string ): void {
		this.value = value;
	}

	public onChange ( event: Event ): void {
		const value: string =
			( <HTMLInputElement>event.target ).value;

		this.changed( value );
	}

	public registerOnChange ( fn: any ): void {
		this.changed = fn;
	}

	public registerOnTouched ( fn: any ): void {
		this.touched = fn;
	}

	public setDisabledState ( isDisabled: boolean ): void {
		this.isDisabled = isDisabled;
	}

	toggleVisibility(){
		this.visibility = !this.visibility;
	}

}
