import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = 'https://api.escuelajs.co/api/v1/auth';

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<Auth>(`${this.url}/login`, { email, password });
    }

    profile(token: string) {
        // const headers = new HttpHeaders(); 
        // headers.set('Authorization', `Bearer ${token}`);

        return this.http.get<User>(`${this.url}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json'
            }
        });
    }
}