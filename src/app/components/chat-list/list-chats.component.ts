import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {ChatPreviewInfo} from './chat.entities';

@Component({
  template: `
    <h1> Chats: </h1>
    <ul class="items">
      <li *ngFor="let chat of listOfChats">
          <span class="badge">{{ chat.name }}</span>{{ chat.lastMessage}}
      </li>
    </ul>
  `
})
export class ListChatsComponent implements OnInit {

  listOfChats: ChatPreviewInfo[];

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    // todo get username and user chats
    this.chatService.getAllChatsForCurrentUser()
      .subscribe(chats => {
        this.listOfChats = chats;
      });
  }

}

