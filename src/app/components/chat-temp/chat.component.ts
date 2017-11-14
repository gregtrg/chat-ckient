import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {MessageDTO} from './message.dto';
import {HeadersBuilder} from '../login/login.entities';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-chat',
  template: `
    <p><a [routerLink]="['/logout']">Logout</a></p>
    <h1> User: </h1>
    <input [(ngModel)]="messageForSending.user.username" placeholder="username">
    <h1>Messages</h1>
    <input [(ngModel)]="messageForSending.message" placeholder="message..">
    <div *ngIf="messageForSending.message">
      <button (click)="sendData(messageForSending)">Send the message</button>
    </div>
    <li *ngFor="let message of messages">
      {{message.message}} - {{message.messageTime | date: 'hh:mm'}} from {{message.user.username}}
    </li>
  `
})
export class ChatComponent implements OnInit, OnDestroy {

  messageForSending: MessageDTO = new MessageDTO();
  messages: MessageDTO[] = [];

  private subscription: any;

  constructor(//private stomp: StompService,
    private http: HttpClient) {
    // const headers = {
    //   login: '',
    //   passcode: '',
    //   'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYWxhQG1haWwuY29tIiwidXNlcklkIjoiMSIsImF1dGgiOiJST0xFX1' +
    //   'VTRVIiLCJleHAiOjE1MDk3MjA4MTd9.kE8O12gNxNOnB9NE82Tu5nyxSVAIIMbF670LXG3qjuwT4onpDCxsgPq56KA4SWLmUxantMS0TEsQf-sq1M' +
    //   'Hdxw'
    //   // additional header
    // };
    //
    // stomp.configure({
    //   headers: headers,
    //   host: 'http://localhost:8081/socket',
    //   recTimeout: 10000000000,
    //   debug: true,
    //   queue: {'init': false}
    // });
  }

  // sendData(message: MessageDTO): void {
  //   message.messageTime = new Date();
  //   this.stomp.send('/app/socket', message);
  //   message.message = '';
  // }

  ngOnInit(): void {

    // this.getMessageHistory();
    // console.log(this.messages);
    // this.stomp.startConnect().then(() => {
    //   this.stomp.done('init');
    //   console.log('connected');
    //
    //   // subscribe
    //   this.subscription = this.stomp.subscribe('/topic/messages', this.response);
    // });
  }

  ngOnDestroy(): void {
    // // unsubscribe
    // this.subscription.unsubscribe();
    //
    // // disconnect
    // this.stomp.disconnect().then(() => {
    //   console.log('Connection closed');
    // });
  }

  getMessageHistory(): void {
    const headers = HeadersBuilder.get()
      .addJsonContentType()
      .addAuthToken()
      .build();

    const options = {headers: headers};
    this.http
      .get(`http://localhost:8081/chat`, options)
      .map(data => {
        console.log(data);
        return data as MessageDTO[];
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
