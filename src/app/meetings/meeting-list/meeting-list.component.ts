import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MeetingsService } from 'src/app/api/meetings.service';
import { UsersService } from 'src/app/api/users.service';
import { createDialogComponent } from 'src/app/shared/dialog/dialog.component';
import { IUser } from 'src/app/users/user-list/user-list.component';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent implements OnInit, OnDestroy {
  public events = [];
  public viewDate: Date = new Date();
  public userList: IUser[] = [];
  public form: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private meetingsService: MeetingsService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      users: new FormControl('')
    });
    this.getMeetingList();
    this.getUserList().then(response => {
      this.userList = response;
      this.form.controls.users.setValue(
        this.userList.map(user => user.id)
      );
    });
  }

  private async getUserList(): Promise<IUser[]> {
    let result: IUser[] = [];
    try {
      result = await this.usersService.getUsers().toPromise();
    } catch (error) {
      // Manage error
    }
    return result;
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

  public filterByUser(): void {
    this.events = [];

    this.meetingsService.getMeetingsByUser(this.form.controls.users.value).subscribe(meetings => {
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
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
