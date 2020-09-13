import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { createDialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Open AddMeeting modal.
   */
  public openAddMeetingDialog(): void {
    const openedDialog = createDialogComponent({
      dialog: this.dialog,
      dialogData: {
        innerComponentType: AddMeetingComponent,
        title: 'Add meeting',
        buttonCloseFalse: 'Cancel',
        buttonCloseTrue: 'Save meeting',
      }
    });

    openedDialog.componentInstance.closeDialog$.subscribe(result => {
      if (result) {
        openedDialog.close();
      }
    });
  }

}
