import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProductModel } from '../../models/ProductModel';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {
  product: ProductModel = {
    name: '',
    description: '',
    price: 0,
    Active: true,
  };

  constructor(
    public dialogRef: MatDialogRef<ProductAddComponent>,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  save() {
    this.productService.addProduct(this.product).subscribe({
      next: (updatedProduct) => {
        this.snackBar.open(updatedProduct.name + ' Ürünü başarıyla eklendi!', 'Kapat', { duration: 3000 });
        this.productService.notifyProductListUpdate();
        this.router.navigate(['/products']);
      },
      error: (err) => {
        if(err.status == 403)
        {
        this.snackBar.open('Ürün eklemeye yetkiniz yok!', 'Kapat', { duration: 3000, panelClass: 'error-snackbar' });
        }else{
          this.snackBar.open(err.error || 'Ürün eklenirken hata oluştu!', 'Kapat', { duration: 3000, panelClass: 'error-snackbar' });
        }
      }
    });
    this.dialogRef.close();
  }
}
