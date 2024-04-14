import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/pages/shop/interfaces';
import { CoinsComponent } from '../kit/coins/coins.component';

@Component({
	selector: 'frozen-fantasy-product-card',
	standalone: true,
	imports: [CommonModule, CoinsComponent],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
	@Input() product!: IProduct;
}
