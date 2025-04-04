import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginDto } from '../../models/LoginDto';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule,MatSnackBarModule, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginInput: LoginDto = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router,private snackBar: MatSnackBar) { }

  login() {
    this.loginInput.username
    this.authService.login(this.loginInput).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.showErrorMessage('Giriş başarısız! ' + (err.error || 'Lütfen bilgilerinizi kontrol edin.'));
      }
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Kapat', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
