import {Injectable} from '@angular/core';
import {MessageDTO} from '../dto/message.dto';
import {Http} from '@angular/http';
import {StompService} from 'ng2-stomp-service';

@Injectable()
export class MessageService {

  private subscription: any;

  constructor(private stomp: StompService, private http: Http) {}

  init(): void {
    this.stomp.configure({
      host: 'http://localhost:8081/chat',
      debug: true,
      recTimeout: 5000,
      queue: {'init': false}
    });
  }

  subscribe(destination: string, callback: string): void {
    // todo: pass parameters
    this.subscription = this.stomp.subscribe('/topic/messages', callback);
  }

  sendMessage(message: MessageDTO, headers?: any): void {
    message.messageTime = new Date();
    this.stomp.send('/app/chat', message, headers);
  }

  destroy(): void {
    // unsubscribe
    this.subscription.unsubscribe();

    // disconnect
    this.stomp.disconnect().then(() => {
      console.log('Connection closed');
    });
  }
}
