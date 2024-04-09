import { Component, OnDestroy, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, provideRouter } from '@angular/router';
import { coreRoutes } from './core.routes';
import { UserService } from 'src/services/auth/user.service';
import { Subject, catchError, take, takeUntil, throwError } from 'rxjs';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
	selector: 'frozen-fantasy-core',
	standalone: true,
	imports: [CommonModule, RouterModule],
	providers: [],
	templateUrl: './core.component.html',
	styleUrl: './core.component.less',
})
export class CoreComponent implements OnDestroy {
	destroy$ = new Subject();
	constructor(private usersService: UserService, private authService: AuthService, private router: Router) {
		this.usersService.getUserInfo().pipe(takeUntil(this.destroy$)).subscribe((val) => {
			console.log(val);
		});
	}
	ngOnDestroy(): void {
		this.destroy$.next(true);
	}
	onLogout(): void {
		this.authService.logout().pipe(take(1), catchError((e) => {
			this.router.navigate(['/login']);
			return throwError(e);
		})).subscribe(() => {
			this.router.navigate(['/login']);
		});
	}
}
