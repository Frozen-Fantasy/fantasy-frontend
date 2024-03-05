import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/ui/kit/input/input.component';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'frozen-fantasy-login',
	standalone: true,
	imports: [CommonModule, InputComponent, RouterModule,ReactiveFormsModule,FormsModule, HttpClientModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	
})
export class LoginComponent {
	signUp:boolean=false;
	emailSent:boolean = false;
	signUpForm = new FormGroup({
		code: new FormControl(''),
		email: new FormControl<string>(''),
  		nickname: new FormControl(''),
  		password: new FormControl('')
	});

	constructor(private authService:AuthService){

	}

	enableSignUp(){
		this.signUp=true;
	}

	onEmailSend(){
		console.log(this.signUpForm.get('email')!.value);
		if(this.signUpForm.get('email')!.value){
			this.authService.sendEmail(this.signUpForm.get('email')?.value??'').pipe(

			).subscribe((val)=>{
				this.emailSent = true;

				return console.log(val)
			});
		}
	}

	onSignUpSubmit(){

	}
}
