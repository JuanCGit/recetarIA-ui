import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  LoginRequestInterface,
  RegisterRequestInterface,
  TokenInterface,
  UserInterface,
} from '../../interfaces/auth.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #router = inject(Router);

  #token = new BehaviorSubject<string | undefined>(
    localStorage.getItem('token') || undefined,
  );
  token$ = this.#token.asObservable();
  user$ = this.getUser().pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  registerUser(user: RegisterRequestInterface) {
    return this.#http
      .post<TokenInterface>(`${environment.apiUrl}/auth/register`, user)
      .pipe(
        tap(({ token }) => {
          this.saveToken(token);
        }),
      );
  }

  loginUser(user: LoginRequestInterface) {
    return this.#http
      .post<TokenInterface>(`${environment.apiUrl}/auth/login`, user)
      .pipe(
        tap(({ token }) => {
          this.saveToken(token);
        }),
      );
  }

  getUser() {
    return this.#http.get<UserInterface>(`${environment.apiUrl}/auth/user`);
  }

  saveToken(token: string) {
    this.#token.next(token);
    localStorage.setItem('token', token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.#token.next(undefined);
  }

  updateUserName(username: string) {
    return this.#http.put<UserInterface>(
      `${environment.apiUrl}/auth/update-username`,
      { username },
    );
  }

  logout() {
    this.clearToken();
    this.#router.navigate(['/login']);
  }
}
