import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/pages/shop/interfaces';
import { CoinsComponent } from '../kit/coins/coins.component';
import { ButtonComponent } from '../kit/button/button.component';

@Component({
	selector: 'frozen-fantasy-product-card',
	standalone: true,
	imports: [CommonModule, CoinsComponent, ButtonComponent],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
	@Input() product!: IProduct;
	@Output() buy = new EventEmitter<number>();

	onBuy(id: number) {
		this.buy.emit(id);
	}
}
