import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/ui/kit/input/input.component';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { ISignUpRequestBody } from 'src/utils/dto';

@Component({
	selector: 'frozen-fantasy-login',
	standalone: true,
	imports: [CommonModule, InputComponent, RouterModule,ReactiveFormsModule,FormsModule, HttpClientModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	
})
export class LoginComponent  implements OnDestroy{
	signUp:boolean=false;
	emailSent:boolean = false;
	signUpForm = new FormGroup({
		code: new FormControl('',{validators:Validators.required}),
		email: new FormControl('',{validators:Validators.required}),
  		login: new FormControl('',{validators:Validators.required}),
  		password: new FormControl('',{validators:Validators.required}),
		confirmPassword: new FormControl('',{validators:Validators.required})
	});
	destroy$ = new Subject();

	constructor(private authService:AuthService,private cdr:ChangeDetectorRef){

	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
	}

	toggleSignUp(){
		console.log(this.signUp);
		this.signUp=!this.signUp;
		console.log(this.signUp);
	}

	onEmailSend(){
		if(this.signUpForm.get('email')!.value){
			this.authService.sendEmail(this.signUpForm.get('email')?.value??'').pipe(
				takeUntil(this.destroy$)
			).subscribe((val)=>{
				this.emailSent = true;
				this.cdr.detectChanges();
			});
		}
	}

	onSignUpSubmit(){
		//todo: password validator
		if(this.signUpForm.valid && this.confirmPassword()){
			const params :ISignUpRequestBody = {
			code:parseInt(this.signUpForm.get('code')?.value??''),
			email:this.signUpForm.get('email')?.value??'',
			nickname: this.signUpForm.get('login')?.value??'',
			password: this.signUpForm.get('password')?.value??''
		};
		this.authService.signUp(params).pipe(takeUntil(this.destroy$)).subscribe((val)=>{
			console.log(val);
		});
		}
		
	}

	confirmPassword():boolean{
		return this.signUpForm.get('password')?.value===this.signUpForm.get('confirmPassword')?.value;
	}
}
