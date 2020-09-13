import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../users/user-list/user-list.component';

export interface IMeeting {
  name: string;
  day: string;
  startsAt: string;
  finishesAt: string;
  participants: number[];
}

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private meetingList: IMeeting[] = [];

  constructor() { }

  /**
   * Add a new meeting
   * @param meeting
   */
  public addMeeting(meeting: IMeeting): Observable<IMeeting> {
    // const result = {
    //   name: 'test',
    //   day: 'test',
    //   startsAt: 'test',
    //   finishesAt: 'test',
    //   participants: [1, 2, 3],
    // };
    this.meetingList.push(meeting);
    return of(meeting);
  }
}
