import { AuthGuard } from './auth/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { StartpageComponent } from './startpage/startpage.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NotAuthenticatedPageComponent } from './not-authenticated-page/not-authenticated-page.component';
import { TimeTableComponent } from './time-table/time-table.component';
export const appRoutes: Routes = [
{path: '', redirectTo: '/startpage', pathMatch: 'full' },
{path: 'startpage', component: StartpageComponent},
{path: 'chat', component: ChatComponent,  canActivate: [AuthGuard]},
{path: 'notAuthenticated', component: NotAuthenticatedPageComponent},
{path: 'timetable', component: TimeTableComponent, canActivate: [AuthGuard]}
];
export const appRouting = RouterModule.forRoot(appRoutes);
export const routingComponents = [StartpageComponent, ChatComponent, NotAuthenticatedPageComponent, TimeTableComponent];
