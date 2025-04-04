import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../models/ProductModel';
import { APIURL } from '../models/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = APIURL.baseUrl;
  constructor(private http: HttpClient) { }

   private productListUpdated = new BehaviorSubject<void>(void 0);
   productListUpdated$ = this.productListUpdated.asObservable();
   notifyProductListUpdate() {
    this.productListUpdated.next();
  }
   getAllProduct(): Observable<any> {
      return this.http.get(`${this.apiUrl}${APIURL.product.getAll}`);
    }

    deleteProduct(id:string){
      return this.http.delete<void>(`${this.apiUrl}${APIURL.product.delete}`, {
        params: { id }
      });
    }

    updateProduct(product: ProductModel) {
      return this.http.patch<ProductModel>(`${this.apiUrl}${APIURL.product.update}`, product);
    }

    addProduct(product: ProductModel): Observable<any> {
      return this.http.post(`${this.apiUrl}${APIURL.product.add}`, product );
      }
}
