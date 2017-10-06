import { Component, OnInit, OnDestroy } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StompService } from 'ng2-stomp-service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `    
  <h1> User: </h1>
  <input [(ngModel)]="messageForSending.user.username" placeholder="username">
  <h1>Messages</h1>
    <input [(ngModel)]="messageForSending.message" placeholder="message..">
    <div *ngIf="messageForSending.message">
      <button (click)="sendData(messageForSending)">Send the message</button>
    </div>
  <li *ngFor="let message of messages">
      {{message.message}}  -  {{message.messageTime | date: 'hh:mm'}} from {{message.user.username}} 
  </li>
  `
})
export class AppComponent implements OnInit, OnDestroy {


  private messageForSending: MessageDTO = new MessageDTO();
  private messages: MessageDTO[] = [];

  private subscription: any;
  constructor(private stomp: StompService, private http: Http) {
    // configuration
    stomp.configure({
      host: 'http://localhost:8081/chat',
      debug: true,
      recTimeout: 5000,
      queue: { 'init': false }
    });
  }

  sendData(message: MessageDTO): void {
    message.messageTime = new Date();
    this.stomp.send('/app/chat', message);
    message.message = '';
  }

  ngOnInit(): void {

    this.getMessageHistory();
    console.log(this.messages);
    this.stomp.startConnect().then(() => {
      this.stomp.done('init');
      console.log('connected');

      // subscribe
      this.subscription = this.stomp.subscribe('/topic/messages', this.response);
    });
  }

  ngOnDestroy(): void {
    // unsubscribe
    this.subscription.unsubscribe();

    // disconnect
    this.stomp.disconnect().then(() => {
      console.log('Connection closed');
    });
  }

  getMessageHistory(): void {
    this.http
      .get(`http://localhost:8081/chat`)
      .map(response => {
        console.log(response);
        return response.json() as MessageDTO[];
      })
      .subscribe(data => {
        console.log(data);
        return this.messages = data;
      });
  }


  public response = (data) => {
    console.log(data);
    this.messages.push(data as MessageDTO);
    console.log(this.messages);

  }
}
export class MessageDTO {
  message: string;
  messageTime: Date;
  user: UserDTO = new UserDTO();
}
export class UserDTO {
  username: string;
}
