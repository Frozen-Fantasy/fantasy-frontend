import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/ui/kit/input/input.component';

@Component({
	selector: 'frozen-fantasy-login',
	standalone: true,
	imports: [CommonModule, InputComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
