import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from 'src/utils/directives/ngLet.directive';
import { ShopService } from 'src/services/shop.service';
import { IProduct } from './interfaces';
import { Observable } from 'rxjs';
import { ProductCardComponent } from 'src/ui/product-card/product-card.component';

@Component({
	selector: 'frozen-fantasy-shop',
	standalone: true,
	imports: [CommonModule, LetDirective, ProductCardComponent],
	templateUrl: './shop.component.html',
	styleUrl: './shop.component.less',
})
export class ShopComponent {
	products$: Observable<IProduct[]> | undefined;
	constructor(private shopService: ShopService) {
		this.shopService.getProducts();
		this.products$ = this.shopService.products$;
	}

	onBuy(id: number) {
		this.shopService.buyProduct(id);
	}
}
