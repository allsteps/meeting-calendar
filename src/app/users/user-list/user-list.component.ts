import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { createDialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddUserComponent } from '../add-user/add-user.component';

export interface IUser {
  name: string;
}

const ELEMENT_DATA: IUser[] = [
  {name: 'Test'},
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Open AddUser modal.
   */
  public openAddUserDialog(): void {
    console.log('add user');
    const openedDialog = createDialogComponent({
      dialog: this.dialog,
      dialogData: {
        innerComponentType: AddUserComponent,
        title: 'Add user',
        buttonCloseFalse: 'Cancel',
        buttonCloseTrue: 'Save user',
      }
    });

    openedDialog.componentInstance.closeDialog$.subscribe(result => {
      if (result) {
        openedDialog.close();
        console.log('click save user');
      }
    });
  }
}
