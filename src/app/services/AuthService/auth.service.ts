import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterDto } from '../../models/UserRegisterDto';
import { UserLoginDto } from '../../models/UserLoginDto';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://localhost:7130/api/auth/';
  constructor(private http: HttpClient, private router: Router) {}

  register(model: UserRegisterDto) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(model);
    return this.http.post(this.url + 'register', body, { headers });
  }

  login(model: UserLoginDto) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(model);

    return this.http.post(this.url + 'login', body, { headers }).pipe(
      map((data: any) => {
        this.saveToken(data.token, data.expiration);
      })
    );
  }
  saveToken(token: string, expiration: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration);
  }
  isTokenExpired(): boolean {
    const expiration = localStorage.getItem('expiration');
    if (!expiration) {
      return true;
    }

    const expirationDate = new Date(expiration);
    const now = new Date();

    return expirationDate <= now;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }
}
