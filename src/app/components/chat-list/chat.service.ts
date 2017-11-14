import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ChatPreviewInfo} from './chat.entities';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) {
  }

  getAllChatsForCurrentUser(): Observable<ChatPreviewInfo[]> {
    return Observable.of(CHATS);
  }
}

const CHATS: ChatPreviewInfo[] = [
  new ChatPreviewInfo('Туса', 'Идем куда-то?'),
  new ChatPreviewInfo('Чатик', 'Я так тоже считаю'),
];
