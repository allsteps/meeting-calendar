import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListHeaderModule } from '../shared/list-header/list-header.module';



@NgModule({
  declarations: [MeetingListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ListHeaderModule
  ]
})
export class MeetingsModule { }
