import {UserDTO} from './user.dto';

export class MessageDTO {
  message: string;
  messageTime: Date;
  user: UserDTO = new UserDTO();
}
