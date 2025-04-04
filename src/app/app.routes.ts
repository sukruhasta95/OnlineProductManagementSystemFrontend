import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/sign-up/sign-up.component';
import { ProductListComponent } from './product/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'products', component: ProductListComponent }
];
