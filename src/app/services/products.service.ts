import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators'

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://young-sands-07814.herokuapp.com/api/products'

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.url, { params })
    .pipe(
      retry(3) //reintentos para hacer el consumo del get
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  getProductsByPage(limit: number, offset: number) {    // Se unifica con el metodo de getAllProducts
    return this.http.get<Product[]>(`${this.url}`, {
      params: { limit, offset }
    });
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.url, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.url}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }

}
