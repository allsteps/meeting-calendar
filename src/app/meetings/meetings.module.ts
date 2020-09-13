import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListHeaderModule } from '../shared/list-header/list-header.module';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';



@NgModule({
  declarations: [MeetingListComponent, AddMeetingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ListHeaderModule
  ]
})
export class MeetingsModule { }
