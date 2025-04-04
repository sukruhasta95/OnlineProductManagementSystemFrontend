import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/UserModel';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule,MatSelectModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent {
  userInput:UserModel={
    Username: '',
    Password: '',
    Role: '',
    Active: true
  }
  roles: string[] = ['admin', 'user'];
  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.userInput).subscribe({
      next: () => {
        alert('Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        alert(err.error || 'Kayıt oluşturulurken bir hata oluştu.');
      }
    });
  }
}
