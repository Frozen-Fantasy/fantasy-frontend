import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from 'src/pages/shop/interfaces';
import { BASE_API_URL } from 'src/utils/dto';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  products$ = new BehaviorSubject<IProduct[]>([]);
  constructor(private http: HttpClient) { }

  getProducts() {
    this.http.get<IProduct[]>(`${BASE_API_URL}/store/products`).subscribe(products => this.products$.next(products));
  }

  buyProduct(id: number) {
    this.http.post(`${BASE_API_URL}/store/products/buy?id=${id}`, {}).subscribe();
  }
}
