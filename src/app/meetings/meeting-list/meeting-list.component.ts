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
  public events = [{
    start: new Date('September 7, 2020 13:35:32'),
    end: new Date('September 7, 2020 14:35:32'),
    title: 'test',
    color: { primary: '#3F51B5', secondary: '#D8DCF0' },
    allDay: false,
  }];
  viewDate: Date = new Date();

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
