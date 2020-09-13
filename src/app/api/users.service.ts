import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../users/user-list/user-list.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userId = 0;
  private userList: IUser[] = [];

  constructor() { }

  /**
   * Add a new user
   * @param user
   */
  public addUser(user: IUser): Observable<IUser> {
    const result = {
      id: ++this.userId,
      name: user.name,
    };
    this.userList.push(result);
    return of(result);
  }

  /**
   * Returns an array of users
   */
  public getUsers(): Observable<IUser[]> {
    return of(this.userList);
  }
}
