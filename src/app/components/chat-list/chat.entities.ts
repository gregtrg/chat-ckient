export class ChatPreviewInfo {
  name: string;
  lastMessage: string;

  constructor(name: string, lastMessage: string) {
    this.name = name;
    this.lastMessage = lastMessage;
  }
}
