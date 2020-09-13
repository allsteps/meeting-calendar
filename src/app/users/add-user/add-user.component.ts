import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/api/users.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
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
      this.usersService.addUser({name: this.form.controls.name.value}).subscribe(user => {
        // TODO add snackbar
        console.log('user', user);
      });
    }
  }
}
