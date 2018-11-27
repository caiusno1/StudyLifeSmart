import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import { AuthentificationService } from './authentification-service/authentification.service';
import { appRouting, routingComponents } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    appRouting
  ],
  providers: [AuthentificationService, WebsocketService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
