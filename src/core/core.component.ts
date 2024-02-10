import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, provideRouter } from '@angular/router';
import { coreRoutes } from './core.routes';

@Component({
	selector: 'frozen-fantasy-core',
	standalone: true,
	imports: [CommonModule, RouterModule],
	providers: [],
	templateUrl: './core.component.html',
	styleUrl: './core.component.less',
})
export class CoreComponent { 
	tabs = [
		{
			title:'Все турниры',
			routerLink: '/tournaments'
		},
		{
			title:'Мои турниры',
			routerLink: '/my-tournaments'
		},
		{
			title:'Рейтинг',
			routerLink: '/rating'
		},
		{
			title:'Галерея',
			routerLink: '/gallery'
		},
		{
			title:'Правила',
			routerLink: '/rules'
		}
	];
	activeTab:number = 0;

	onClick(id:number){
		this.activeTab = id;
	}
}
