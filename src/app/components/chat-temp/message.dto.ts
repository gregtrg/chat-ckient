import {User} from './user.dto';

export class MessageDTO {
  message: string;
  messageTime: Date;
  user: User = new User();
}
