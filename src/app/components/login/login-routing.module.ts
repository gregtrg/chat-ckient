import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';

const loginRouters: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [LogoutGuard]
  }, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRouters)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {
}
