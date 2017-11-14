import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginGuard} from '../login/login-guard.service';
import {ListChatsComponent} from './list-chats.component';

const chatRouters: Routes = [
  {
    path: 'chat',
    component: ListChatsComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(chatRouters)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule {
}
