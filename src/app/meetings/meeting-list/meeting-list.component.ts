import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MeetingsService } from 'src/app/api/meetings.service';
import { createDialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent implements OnInit, OnDestroy {
  public events = [];
  public viewDate: Date = new Date();

  private subscriptions = new Subscription();

  constructor(
    private dialog: MatDialog,
    private meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    this.getMeetingList();
  }

  private getMeetingList(): void {
    this.events = [];

    this.subscriptions.add(
      this.meetingsService.getMeetings().subscribe(meetings => {
        meetings.forEach(meeting => {
          const startTime = new Date(meeting.date);
          startTime.setHours(meeting.start, 0, 0);
          const endTime = new Date(meeting.date);
          endTime.setHours(meeting.end, 0, 0);
          this.events.push({
            start: startTime,
            end: endTime,
            title: meeting.name,
            color: { primary: '#3F51B5', secondary: '#D8DCF0' },
            allDay: false,
          });
        });
      })
    );
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
        setTimeout(() => {
          this.getMeetingList();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
