import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenSubject: BehaviorSubject<string>;
  public authToken: Observable<string>;
  private currentUserSubject: BehaviorSubject<UserModel | null>;
  public currentUser: Observable<UserModel | null>;

  constructor(private http: HttpClient) {
    const userFromLocalStorage = JSON.parse(
      <string>localStorage.getItem('currentUser')
    );
    const authTokenFromLocalStorage =
      JSON.parse(<string>localStorage.getItem('authToken')) || '';

    this.authTokenSubject = new BehaviorSubject(authTokenFromLocalStorage);
    this.authToken = this.authTokenSubject.asObservable();
    this.currentUserSubject = new BehaviorSubject(userFromLocalStorage);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }

  public get authTokenValue(): string {
    return this.authTokenSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`http://localhost:4000/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          const authToken = response.access_token;
          const user = jwtDecode(authToken);
          localStorage.setItem(
            'authToken',
            JSON.stringify(response.access_token)
          );
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.authTokenSubject.next(authToken);
          this.currentUserSubject.next(user as UserModel);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.authTokenSubject.next('');
    this.currentUserSubject.next(null);
  }
}
