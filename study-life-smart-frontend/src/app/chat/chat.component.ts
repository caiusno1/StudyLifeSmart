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

  constructor(private chat: ChatService) {
    this.chat.messages.subscribe(msg => {
      this.text += msg.text;
      console.log(msg);
    });
     // this.sendMessage();
  }

  ngOnInit() {
  }

  sendMessage() {
    this.chat.sendMsg('Test Message');
  }

  onClickMe() {
    console.log('button was clicked');
    this.chat.sendMsg(this.newMsg);
    this.newMsg = '';
  }

}
