import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7128/api';
  constructor(private http: HttpClient) { }

   private productListUpdated = new BehaviorSubject<void>(void 0);
   productListUpdated$ = this.productListUpdated.asObservable();
   notifyProductListUpdate() {
    this.productListUpdated.next();
  }
   getAllProduct(): Observable<any> {
      return this.http.get(`${this.apiUrl}/products/getAllProducts`);
    }

    deleteProduct(id:string){
      return this.http.delete<void>(`${this.apiUrl}/products/deleteProduct`, {
        params: { id }
      });
    }

    updateProduct(product: ProductModel) {
      return this.http.patch<ProductModel>(`${this.apiUrl}/products/updateProduct`, product);
    }

    addProduct(product: ProductModel): Observable<any> {
      return this.http.post(`${this.apiUrl}/products/addProduct`, product );
      }
}
