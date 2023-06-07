import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = `${environment.API_URL}/api/products`

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
    return this.http.get<Product>(`${this.url}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el servidor');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas autorizado');
        }
        return throwError('Upsa algo salio mal');
      })
    );
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
