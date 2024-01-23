import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'frozen-fantasy-rating',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './rating.component.html',
	styleUrl: './rating.component.less',
})
export class RatingComponent {}
