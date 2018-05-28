import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) {}

  login(credentials) {
    // login user using authService.
    //console.log(credentials.value);
    this.authService.login(credentials);
  }

  logout() {
    // logout user using authService.
    this.authService.logout();
  }

  testApi() {
    // test API access by invoking getResource on authService.
    this.authService.getResource('friends');
  }
}
