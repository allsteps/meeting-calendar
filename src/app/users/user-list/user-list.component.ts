import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/api/users.service';
import { createDialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddUserComponent } from '../add-user/add-user.component';

export interface IUser {
  id?: number;
  name: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList(): void {
    this.usersService.getUsers().subscribe(data => {
      this.dataSource = new MatTableDataSource<IUser>(data);
    });
  }

  /**
   * Open AddUser modal.
   */
  public openAddUserDialog(): void {
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
        this.getUserList();
      }
    });
  }
}
