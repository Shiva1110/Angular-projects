import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  username: string;
}

export interface IUserRegisterRes {
  message: string;
  success: boolean;
}

export interface IUserLoginRes {
  id: string;
  token: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = `https://movies-app-node-backend.herokuapp.com/`;

  constructor(private http: HttpClient) { }

  userLogin(payload: IUserLogin): Observable<IUserLoginRes> {
    return this.http.post<IUserLoginRes>(`${this.baseUrl}login`, payload);
  }

  registerUser(payload: IUserRegister): Observable<IUserRegisterRes> {
    return this.http.post<IUserRegisterRes>(`${this.baseUrl}register`, payload);
  }

  isUserLoggedIn() {
    return !!localStorage.getItem('auth-token');
  }

  getUserToken() {
    return localStorage.getItem('auth-token');
  }

  logOut() {
    localStorage.removeItem('auth-token');
  }
}
