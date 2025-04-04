import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from '../models/LoginDto';
import { UserModel } from '../models/UserModel';
import { APIURL } from '../models/apiUrl';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = APIURL.baseUrl;

  constructor(private http: HttpClient) { }

  login(input:LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}${APIURL.auth.login}`, input );
  }

  signup(input:UserModel): Observable<any> {
    return this.http.post(`${this.apiUrl}${APIURL.auth.register}`, input );
  }
  private tokenKey = 'authToken';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
