import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingListComponent } from './meetings/meeting-list/meeting-list.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  { path: 'meetings', component: MeetingListComponent },
  { path: 'users', component: UserListComponent },
  { path: '', redirectTo: '/meetings', pathMatch: 'full' },
  { path: '**', component: MeetingListComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }