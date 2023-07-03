import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private url = 'https://api.escuelajs.co/api/v1/auth';

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<Auth>(`${this.url}/login`, { email, password });
    }

    profile() {
        return this.http.get(`${this.url}/profile`);
    }
}