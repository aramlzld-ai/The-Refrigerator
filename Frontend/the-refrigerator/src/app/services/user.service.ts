import {HttpClient} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { LoginRequest } from '../interfaces/Login-Interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/Login-Interfaces/login-response.interface';
import {API_URL} from '../config/api.config';
import { RegisterRequest } from '../interfaces/Login-Interfaces/register.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(private http: HttpClient) {}

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${API_URL}/users/login`, loginRequest).pipe(
            tap((response: LoginResponse) => {
                localStorage.setItem('accessToken', response.accessToken);
            })
        );
    } 
    register(registerRequest: RegisterRequest): Observable<any> {
        return this.http.post(`${API_URL}/users/create-user`, registerRequest);
    }

    logout(){
        localStorage.removeItem('accessToken');
    }
}