import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    imgParent = '';
    showImg = true;

    constructor(private authService: AuthService, private userService: UsersService) {

    }

    onLoaded(img: string) {
        console.log('log padre', img);
    }

    toggleImg() {
        this.showImg = !this.showImg;
    }

    createuser() {
        this.userService.create({
            name: 'Santi',
            email: 'santi@mail.com',
            password: '1234',
            role: 'admin',
            avatar: "https://picsum.photos/640/640?r=4739"

        })
        .subscribe(rta => {
            console.log(rta);
        })
    }

    login() {
        this.authService.login('santi@mail.com', '1234')
        .subscribe(rta => {
            console.log(rta.access_token);
        });
    }

    getAllUsers() {
        this.userService.getAll()
        .subscribe(rta => {
            console.log(rta);
        });
    }
}