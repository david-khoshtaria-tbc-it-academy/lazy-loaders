import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  currentUser = signal<any>(null);

  private decodeToken(token: string) {
    try {
      const payload = token.split('.')[1];
      const decodedJson = atob(payload);
      return JSON.parse(decodedJson);
    } catch (e) {
      return null;
    }
  }

  restoreUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = this.decodeToken(token);
      this.currentUser.set(userData);
    }
  }

  signup(userData: any) {
  return this.http.post<any>(`https://tia.up.railway.app/auth/signup`, userData).pipe(
    tap(res => {
      const token = res.access_token || res.verification_token || res.token;
      if (token) {
        localStorage.setItem('token', token);
        const user = this.decodeToken(token);
        this.currentUser.set(user);
      }
    })
  );
}

  login(credentials: any) {
    return this.http.post<any>(`https://tia.up.railway.app/auth/login`, credentials).pipe(
      tap(res => {
        const token = res.access_token || res.verification_token || res.token;
        if (token) {
          localStorage.setItem('token', token);
          
          const userData = this.decodeToken(token);
          this.currentUser.set(userData); 
          
          console.log('მონაცემები აღდგენილია ტოკენიდან:', userData);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    window.location.href = '/login';
  }
}