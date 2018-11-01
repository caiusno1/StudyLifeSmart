import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  title = 'app';

  constructor(private chat: ChatService) {
    this.chat.messages.subscribe(msg => {
      console.log(msg);
    });
    // this.sendMessage();
  }

  ngOnInit() {
  }

  sendMessage() {
    this.chat.sendMsg('Test Message');
  }

}
