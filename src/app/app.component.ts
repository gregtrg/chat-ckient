import {Component, OnInit, OnDestroy} from '@angular/core';

import {Headers, Http, RequestOptions} from '@angular/http';
import {StompService} from 'ng2-stomp-service';
import 'rxjs/add/operator/map';
import {MessageDTO} from './dto/message.dto';

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
      {{message.message}} - {{message.messageTime | date: 'hh:mm'}} from {{message.user.username}}
    </li>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  messageForSending: MessageDTO = new MessageDTO();
  messages: MessageDTO[] = [];

  private subscription: any;

  constructor(private stomp: StompService, private http: Http) {
    // configuration
    // const headers = new Headers();
    // headers.append('passcode', '');
    // headers.append('login', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYWxhQG1haWwuY29tIiwidXNlcklkIjoiMSIs' +
    //   'ImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE1MDg5NDY0NjJ9.EHjfPH-GGptiOW1JG_NpDKQi40jOUe3yz51eXerM_5J1zCKTYon6HcE2KxP' +
    //   'pFkQA-YC7j6Uf0gaZ9zLCtPiD6w');
    const headers = {
      login: '',
      passcode: '',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYWxhQG1haWwuY29tIiwidXNlcklkIjoiMSIsImF1dGgiOiJST0xFX1' +
      'VTRVIiLCJleHAiOjE1MDk3MjA4MTd9.kE8O12gNxNOnB9NE82Tu5nyxSVAIIMbF670LXG3qjuwT4onpDCxsgPq56KA4SWLmUxantMS0TEsQf-sq1M' +
      'Hdxw'
      // additional header
    };

    stomp.configure({
      headers: headers,
      host: 'http://localhost:8081/socket',
      recTimeout: 10000000000,
      debug: true,
      queue: {'init': false}
    });
  }

  sendData(message: MessageDTO): void {
    message.messageTime = new Date();
    this.stomp.send('/app/socket', message);
    message.message = '';
  }

  ngOnInit(): void {

   // this.getMessageHistory();
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
    const myHeaders = new Headers();
    myHeaders.set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYWxhQG1haWwuY29tIiwidXNlcklkIjoiMSIs' +
      'ImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE1MDg5NDY0NjJ9.EHjfPH-GGptiOW1JG_NpDKQi40jOUe3yz51eXerM_5J1zCKTYon6HcE2KxP' +
      'pFkQA-YC7j6Uf0gaZ9zLCtPiD6w');

    const options = new RequestOptions({headers: myHeaders});
    this.http
      .get(`http://localhost:8081/chat`, options)
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
