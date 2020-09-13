import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Open AddUser modal.
   */
  public openAddUserDialog(): void {
    console.log('add user');
  }
}
