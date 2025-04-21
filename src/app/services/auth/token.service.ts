import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  #token = new BehaviorSubject<string | undefined>(
    localStorage.getItem('token') || undefined,
  );
  token$ = this.#token.asObservable();

  saveToken(token: string) {
    this.#token.next(token);
    localStorage.setItem('token', token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.#token.next(undefined);
  }
}
