import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/api/users.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private dialog: DialogComponent
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
    this.subscriptions.add(
      this.dialog.closeDialog$.subscribe(save => {
        if (save) {
          this.onSubmit();
        }
      })
    );
  }

  private onSubmit(): void {
    if (this.form.valid) {
      this.subscriptions.add(
        this.usersService.addUser({name: this.form.controls.name.value}).subscribe(user => {
          // TODO add snackbar
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
