import { Channel } from './channel';
import { ChatMessage } from './ChatMessage';
import { AuthentificationService } from './../authentification-service/authentification.service';
import { Component, OnInit} from '@angular/core';
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
  currentchannel: Channel;
  channels = {};
  channelsList = [];

  constructor(private chat: ChatService, private authServ: AuthentificationService) {
    this.chat.messages.subscribe(msg => {
      const chatmessage: ChatMessage = JSON.parse(msg);
      if (chatmessage.author === undefined) {
        chatmessage.author = 'unknownuser';
      }
      // console.log(msg);
      // this.text += chatmessage.author + ':' + chatmessage.text + '\n';
      this.channels[chatmessage.destination].chatContent += chatmessage.author + ':' + chatmessage.text + '\n';
    });
  }

  ngOnInit() {
    const channel1 = new Channel();
    channel1.chatContent = '';
    channel1.name = 'default';
    const channel2 = new Channel();
    channel2.chatContent = '';
    channel2.name = 'support';
    const channel3 = new Channel();
    channel3.chatContent = '';
    channel3.name = 'party';
    this.channels['default'] = channel1;
    this.channels['support'] = channel2;
    this.channels['party'] = channel3;
    this.currentchannel = this.channels['default'];
    // tslint:disable-next-line:forin
    for (const channelName in this.channels) {
      this.channelsList.push(channelName);
    }
  }

  onClickMe() {
    const chatmessage: ChatMessage = new ChatMessage();
    chatmessage.author = this.authServ.getUsername();
    chatmessage.destination = 'default';
    // temp chat-commands
    if (this.newMsg.startsWith('join ')) {
      chatmessage.type = 'join';
      chatmessage.text = this.newMsg.substring(5, this.newMsg.length);
    } else if (this.newMsg.startsWith('leave ')) {
      chatmessage.type = 'leave';
      chatmessage.text = this.newMsg.substring(6, this.newMsg.length);
    } else {
      chatmessage.type =  'new-message';
      chatmessage.destination = this.currentchannel.name;
      chatmessage.text = this.newMsg;
    }
    console.log(chatmessage);
    this.chat.sendMsg(chatmessage);
    this.newMsg = '';
  }
  public switch_channel(channel: Channel): void {
    this.currentchannel = channel;
    this.text = this.currentchannel.chatContent;
  }

}
