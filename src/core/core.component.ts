import { Component, OnDestroy, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, provideRouter } from '@angular/router';
import { coreRoutes } from './core.routes';
import { UserService } from 'src/services/auth/user.service';
import { Subject, take, takeUntil } from 'rxjs';
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
	tabs = [
		{
			title: 'Все турниры',
			routerLink: '/tournaments'
		},
		{
			title: 'Мои турниры',
			routerLink: '/my-tournaments'
		},
		{
			title: 'Рейтинг',
			routerLink: '/rating'
		},
		{
			title: 'Галерея',
			routerLink: '/gallery'
		},
		{
			title: 'Правила',
			routerLink: '/rules'
		}
	];
	activeTab: number = 0;

	constructor(private usersService: UserService, private authService: AuthService, private router: Router) {
		this.usersService.getUserInfo().pipe(takeUntil(this.destroy$)).subscribe((val) => {
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
	}

	onClick(id: number) {
		this.activeTab = id;
	}

	onLogout(): void {
		this.authService.logout().pipe(take(1)).subscribe(() => {
			this.router.navigate(['/login']);
		}, () => this.router.navigate(['/login']));
	}
}
