import { AuthGuard } from './auth/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { StartpageComponent } from './startpage/startpage.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NotAuthenticatedPageComponent } from './not-authenticated-page/not-authenticated-page.component';
export const appRoutes: Routes = [
{path: '', component: StartpageComponent},
{path: 'startpage', component: StartpageComponent},
{path: 'chat', component: ChatComponent,  canActivate: [AuthGuard]},
{path: 'notAuthenticated', component: NotAuthenticatedPageComponent}
];
export const appRouting = RouterModule.forRoot(appRoutes);
export const routingComponents = [StartpageComponent, ChatComponent, NotAuthenticatedPageComponent];
