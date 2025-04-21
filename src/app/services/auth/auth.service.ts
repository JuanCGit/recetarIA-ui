import {
  LoginRequestInterface,
  RegisterRequestInterface,
  TokenInterface,
  UserInterface,
} from '../../interfaces/auth.interface';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {BehaviorSubject, shareReplay, switchMap, tap} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #http = inject(HttpClient);
  #router = inject(Router);
  #tokenService = inject(TokenService);

  token$ = this.#tokenService.token$;

  #userReloadTrigger = new BehaviorSubject<void>(undefined);

  user = toSignal(
    this.#userReloadTrigger.asObservable().pipe(
      switchMap(() => this.getUser()),
      shareReplay({ refCount: true, bufferSize: 1 }),
    )
  );

  registerUser(user: RegisterRequestInterface) {
    return this.#http.post<TokenInterface>(`${environment.apiUrl}/auth/register`, user)
      .pipe(tap(({ token }) => this.#tokenService.saveToken(token)));
  }

  loginUser(user: LoginRequestInterface) {
    return this.#http.post<TokenInterface>(`${environment.apiUrl}/auth/login`, user)
      .pipe(tap(({ token }) => this.#tokenService.saveToken(token)));
  }

  getUser() {
    return this.#http.get<UserInterface>(`${environment.apiUrl}/auth/user`);
  }

  updateUsername(username: string) {
    return this.#http.put<UserInterface>(`${environment.apiUrl}/auth/update-username`, { username }).pipe(
      tap(() => this.refreshUser())
    );
  }

  refreshUser() {
    this.#userReloadTrigger.next();
  }

  logout() {
    this.#tokenService.clearToken();
    this.#router.navigate(['/login']);
  }
}
