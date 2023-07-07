import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    activeMenu = false;
    counter = 0;
    profile: User | null = null;

    constructor(
        private storeService: StoreService, private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.storeService.myCart$.subscribe(products => {
            this.counter = products.length;
        });
    }

    toggleMenu() {
        this.activeMenu = !this.activeMenu;
    }

    login() {
        // this.authService.login('santi@mail.com', '1234')
        //     .pipe(
        //         switchMap((token) => {
        //             this.token = token.access_token;
        //             console.log(this.token);
        //             return this.authService.getProfile(token.access_token);
        //         })
        //     )
        //     .subscribe(user => {
        //         this.profile = user;
        //     });
        this.authService.loginAndGet('santi@mail.com', '1234')
        .subscribe(user => {
            this.profile = user;
            console.log(user);
        });
    }
}