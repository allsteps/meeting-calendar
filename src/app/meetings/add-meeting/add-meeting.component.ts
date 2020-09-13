import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MeetingsService } from 'src/app/api/meetings.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private meetingsService: MeetingsService,
    private dialog: DialogComponent
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
    this.dialog.closeDialog$.subscribe(save => {
      if (save) {
        this.onSubmit();
      }
    });
  }

  private onSubmit(): void {
    if (this.form.valid) {
      this.meetingsService.addMeeting({
        name: 'test',
        day: 'test',
        startsAt: 'test',
        finishesAt: 'test',
        participants: [1, 2, 3],
      }).subscribe(meeting => {
        // TODO add snackbar
        console.log('meeting', meeting);
      });
    }
  }

}
