import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap((resp: any) => localStorage.setItem('token', resp.token)),
        map((resp) => true),
        catchError((err) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http
      .post(`${base_url}/users`, formData)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  login(formData: LoginForm) {
    return this.http
      .post(`${base_url}/login`, formData)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  loginGoogle(token: string) {
    return this.http
      .post(`${base_url}/login/google`, { token })
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  logout() {
    localStorage.removeItem('token');

    // TODO cambiar por this.user.email...
    google.accounts.id.revoke('garridomfg@gmail.com', () => {
      this.router.navigateByUrl('/login');
    });
  }
}
