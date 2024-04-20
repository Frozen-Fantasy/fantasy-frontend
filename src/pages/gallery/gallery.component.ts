import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'frozen-fantasy-gallery',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.less',
})
export class GalleryComponent {}
