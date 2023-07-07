import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, zip } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    //private url = `${environment.API_URL}/api/v1/products`
    private url = 'https://api.escuelajs.co/api/v1/products';

    constructor(
        private http: HttpClient
    ) { }

    getAllProducts(limit?: number, offset?: number) {
        let params = new HttpParams();
        if (limit && offset) {
            params = params.set('limit', limit);
            params = params.set('offset', offset);
        }
        return this.http.get<Product[]>(this.url, { params, context: checkTime() })
            .pipe(
                retry(3), //reintentos para hacer el consumo del get
                map(products => products.map(item => {
                    return {
                        ...item,
                        taxes: .19 * item.price
                    }
                }))
            );
    }

    fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
        return zip(
            this.getProduct(id),
            this.update(id, dto)
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
        })
            .pipe(
                retry(3), //reintentos para hacer el consumo del get
                map(products => products.map(item => {
                    return {
                        ...item,
                        taxes: .19 * item.price
                    }
                }))
            );
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
