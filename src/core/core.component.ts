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
export class CoreComponent { }
