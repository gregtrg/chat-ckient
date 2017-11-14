import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MessageService} from '../chat-temp/message.service';
import {ChatRoutingModule} from './chat-routing.module';
import {ListChatsComponent} from './list-chats.component';
import {ChatService} from './chat.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ],
  declarations: [
    ListChatsComponent
  ],
  providers: [MessageService, ChatService]
})
export class ChatModule {
}
