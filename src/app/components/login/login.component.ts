import {AfterViewInit, Component, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {LoginInfo} from './login.entities';

@Component({
  template: `
    <h2>LOGIN</h2>
    <div class="modal-body">
        <div class="col-md-8">
          <div class="alert alert-danger" *ngIf="authenticationError">
            <strong>Failed to sign in!</strong> Email or password is incorrect.
          </div>
        </div>
        <form class="form" role="form" (ngSubmit)="login()">
          <div class="form-group">
            <label for="username">Email</label>
            <input type="text" class="form-control" name="username" id="username" placeholder="Your username"
                   [(ngModel)]="loginInfo.username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" name="password" id="password" placeholder="Your password"
                   [(ngModel)]="loginInfo.password">
          </div>
          <div class="form-check">
            <label class="form-check-label" for="rememberMe">
              <input class="form-check-input" type="checkbox" name="rememberMe" id="rememberMe" [(ngModel)]="rememberMe"
                     checked>
              <span>Remember me</span>
            </label>
          </div>
          <button [disabled]="!isPopulated()" type="submit" class="btn btn-primary">Sign in</button>
        </form>
    </div>
  `
})
export class LoginComponent implements AfterViewInit {

  loginInfo: LoginInfo = new LoginInfo();
  rememberMe = false;
  authenticationError: boolean;

  constructor(public authService: LoginService,
              public router: Router,
              private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.renderer.selectRootElement('#username').focus();
  }

  login() {
    this.authService.login(this.loginInfo).subscribe(result => {
      console.log('Log component login result:' + result);
      if (result === true) {
        this.router.navigate(['/chat']);
      }
    }, err => {
      this.authenticationError = true;
    });
  }

  isPopulated(): any {
    return this.loginInfo.username && this.loginInfo.password;
  }
}


