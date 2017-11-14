import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {LoginService} from './login.service';
import {LoginRoutingModule} from './login-routing.module';
import {LoginGuard} from './login-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService, LoginGuard]
})
export class LoginModule {
}
