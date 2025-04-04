import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { AsyncPipe, CommonModule, NgForOf } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ProductAddComponent } from '../product-add/product-add.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatTableModule, MatDialogModule,
    MatIconModule, MatButtonModule, RouterLink, MatTooltipModule, MatSnackBarModule, MatFormFieldModule,
    MatInputModule,],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService, private dialog: MatDialog, private snackBar: MatSnackBar) { }
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'actions'];
  dataSource!: MatTableDataSource<ProductModel>;
  ngOnInit() {
    this.loadDatas();
    this.productService.productListUpdated$.subscribe(() => {
      this.loadDatas();
    });
  }

  refresh() {
    this.loadDatas();
  }

  loadDatas() {
    this.productService.getAllProduct().subscribe((products) => {
      this.dataSource = new MatTableDataSource(products);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openUpdateDialog(product: ProductModel) {
    this.dialog.open(ProductUpdateComponent, {
      width: '50%',
      data: product
    });
  }

  openAddDialog() {
    this.dialog.open(ProductAddComponent, {
      width: '50%'
    });
  }

  deleteProduct(product: ProductModel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Bu ürünü silmek istediğinizden emin misiniz?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product.id || '').subscribe({
          next: () => {
            this.snackBar.open(product.name + ' Ürünü başarıyla silindi!', 'Kapat', { duration: 3000 });
            this.productService.getAllProduct().subscribe((products) => {
              this.dataSource = new MatTableDataSource(products);
            });
          },
          error: (err) => {
            if (err.status == 403) {
              this.snackBar.open('Ürün silmeye yetkiniz yok!', 'Kapat', { duration: 3000, panelClass: 'error-snackbar' });
            } else {
              this.snackBar.open(err.error || 'Ürün silinirken hata oluştu!', 'Kapat', { duration: 3000, panelClass: 'error-snackbar' });
            }
          }

        });
      }
    });
  }
}
