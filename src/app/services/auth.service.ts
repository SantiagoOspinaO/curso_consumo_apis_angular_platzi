import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = 'https://api.escuelajs.co/api/v1/auth';

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    login(email: string, password: string) {
        return this.http.post<Auth>(`${this.url}/login`, { email, password })
        .pipe(
            tap(response => this.tokenService.saveToken(response.access_token))
        );
    }

    getProfile() {
        // const headers = new HttpHeaders(); 
        // headers.set('Authorization', `Bearer ${token}`);
        return this.http.get<User>(`${this.url}/profile`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //     // 'Content-Type': 'application/json'
            // }
        });
    }

    loginAndGet(email: string, password: string) {
        return this.login(email, password)
        .pipe(
            switchMap(rta => this.getProfile()),
        );
    }
}