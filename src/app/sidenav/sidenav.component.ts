import { Component, OnInit } from '@angular/core';

interface IMenu {
  name: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public menuList: IMenu[] = [];

  constructor() {
    this.menuList = [
      {
        icon: 'calendar_today',
        name: 'Meetings',
        route: '/meetings'
      },
      {
        icon: 'group',
        name: 'Users',
        route: '/users'
      }
    ];
  }

  ngOnInit(): void {
  }

}
