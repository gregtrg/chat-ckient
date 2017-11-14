import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';
import {Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <button type="button" [disabled]="!isLoggedIn()" (click)="logout()" class="btn btn-link">Sign out</button>
      </li>
    </ul>
  `,
})
export class NavbarComponent {
  constructor(private loginService: LoginService,
              private router: Router) {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

}
