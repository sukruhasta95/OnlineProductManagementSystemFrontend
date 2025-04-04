import { Component, Inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductModel } from '../../models/ProductModel';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,MatSnackBarModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent {
  product:ProductModel;

  constructor(
    public dialogRef: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {
    this.product = { ...data };
  }

  save() {
    this.productService.updateProduct(this.product).subscribe({
      next: (updatedProduct) => {
        this.snackBar.open(updatedProduct.name + ' Ürünü başarıyla güncellendi!', 'Kapat', { duration: 3000 });
        this.productService.notifyProductListUpdate();
        this.router.navigate(['/products']);
      },
      error: (err) => {
        if(err.status == 403)
          {
          this.snackBar.open('Ürün güncelleme yetkiniz yok!', 'Kapat', { duration: 3000, panelClass: 'error-snackbar' });
          }else{
            this.snackBar.open(err.error || 'Ürün güncellenirken hata oluştu!', 'Kapat', { duration: 3000, panelClass: 'error-snackbar' });
          }
      }
    });
    this.dialogRef.close();
  }
}
