import { ChatMessage } from './ChatMessage';
import { AuthentificationService } from './../authentification-service/authentification.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  title = 'app';
  text = '';
  newMsg = '';

  constructor(private chat: ChatService, private authServ: AuthentificationService) {
    this.chat.messages.subscribe(msg => {
      const chatmessage: ChatMessage = JSON.parse(msg);
      if (chatmessage.author === undefined) {
        chatmessage.author = 'unknownuser';
      }
      console.log(msg);
      this.text += chatmessage.author + ':' + chatmessage.text + '\n';
    });
  }

  ngOnInit() {
  }

  onClickMe() {
    const chatmessage: ChatMessage = new ChatMessage();
    chatmessage.author = this.authServ.getUsername();
    chatmessage.destination = 'default';
    chatmessage.type =  'new-message';
    chatmessage.text = this.newMsg;
    console.log(chatmessage);
    this.chat.sendMsg(chatmessage);
    this.newMsg = '';
  }

}
