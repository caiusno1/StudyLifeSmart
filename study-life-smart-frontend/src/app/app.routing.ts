import { ChatComponent } from './chat/chat.component';
import { StartpageComponent } from './startpage/startpage.component';
import {Routes, RouterModule} from '@angular/router';
export const appRoutes: Routes = [
{path: '', component: StartpageComponent},
{path: 'startpage', component: StartpageComponent},
{path: 'chat', component: ChatComponent}
];
export const appRouting = RouterModule.forRoot(appRoutes);
export const routingComponents = [StartpageComponent, ChatComponent];
