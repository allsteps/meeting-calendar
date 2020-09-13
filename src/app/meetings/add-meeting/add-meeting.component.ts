import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MeetingsService } from 'src/app/api/meetings.service';
import { UsersService } from 'src/app/api/users.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

const TIME_DATA = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {
  public form: FormGroup;
  public timeSlots = [];
  public userList = [];

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
    this.dialog.closeDialog$.subscribe(save => {
      if (save) {
        this.onSubmit();
      }
    });
    this.getUserList();
  }

  private onSubmit(): void {
    if (this.form.valid) {
      this.meetingsService.addMeeting({
        name: this.form.controls.name.value,
        date: this.form.controls.date.value,
        start: this.form.controls.start.value,
        end: this.form.controls.end.value,
        participants: this.form.controls.participants.value,
      }).subscribe(meeting => {
        // TODO add snackbar
        console.log('meeting', meeting);
      });
    }
  }

  private getUserList(): void {
    this.usersService.getUsers().subscribe(data => {
      this.userList = data;
    });
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

}
