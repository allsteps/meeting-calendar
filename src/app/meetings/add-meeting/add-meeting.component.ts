import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MeetingsService } from 'src/app/api/meetings.service';
import { UsersService } from 'src/app/api/users.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { IUser } from 'src/app/users/user-list/user-list.component';

const TIME_DATA = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public timeSlots = [];
  public userList = [];
  private unavailableUsers: IUser[] = [];

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private meetingsService: MeetingsService,
    private usersService: UsersService,
    private dialog: DialogComponent
  ) {
    this.timeSlots = TIME_DATA;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      participants: new FormControl('', Validators.required),
    });
    this.subscriptions.add(
      this.dialog.closeDialog$.subscribe(save => {
        if (save) {
          this.onSubmit();
        }
      })
    );
    this.getUserList().then(response => {
      this.userList = response;
    });
  }

  private onSubmit(): void {
    if (this.form.valid) {
      this.subscriptions.add(
        this.meetingsService.addMeeting({
          name: this.form.controls.name.value,
          date: this.form.controls.date.value,
          start: this.form.controls.start.value,
          end: this.form.controls.end.value,
          participants: this.form.controls.participants.value,
        }).subscribe(meeting => {
          // TODO add snackbar
        })
      );
    }
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

  public checkIfStartIsSelected(): boolean {
    return this.form.controls.start.value ? true : false;
  }

  public filterEndTime(): number[] {
    const result = [];
    this.timeSlots.forEach(element => {
      if (element > this.form.controls.start.value) {
        result.push(element);
      }
    });
    return result;
  }

  /**
   * Filters the user list to show only the users that are available for the given time range.
   * This is a first approach. A refactor would be required. Anyway, having a backend would simplify
   * this operation by having 3 tables (for example: one table with the meetings, another with the users
   * and another one with both ids).
   */
  public filterAvailableUsers(): void {
    this.unavailableUsers = [];
    this.form.controls.participants.setValue([]);
    const newMeetingStart: number = this.form.controls.start.value;
    const newMeetingEnd: number = this.form.controls.end.value;
    // Only filter if both start and end inputs have values
    if (newMeetingStart && newMeetingEnd) {
      // First we get all the meetings for the given day
      this.subscriptions.add(
        this.meetingsService.getMeetingsByDay(this.form.controls.date.value).subscribe(meetingList => {
          meetingList.forEach(meeting => {
            meeting.participants.forEach(participant => {
              // We look for the users that are already participating in a meeting
              this.userList.forEach(user => {
                // We only check the meeting hours for the users that are participating in the meeting
                if (participant === user.id) {
                  // The meeting comparison can be resumed in two cases:
                  // 1. The new meeting starts and/or ends while the given meeting is still ongoing
                  // 2. The new meeting starts before and ends after the given meeting
                  if (newMeetingStart >= meeting.start && newMeetingStart < meeting.end ||
                    newMeetingEnd > meeting.start && newMeetingEnd <= meeting.end ||
                    newMeetingStart <= meeting.start && newMeetingEnd >= meeting.end) {
                    this.unavailableUsers.push(user);
                  }
                }
              });
            });
          });
        })
      );
    }
  }

  /**
   * Returns true if the given user has a meeting in the selected hour range
   * @param user
   */
  public checkIfUserIsUnavailable(user: IUser): boolean {
    let result: boolean;
    this.unavailableUsers.forEach(unavailableUser => {
      if (unavailableUser.id === user.id) {
        result = true;
      }
    });
    return result;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
