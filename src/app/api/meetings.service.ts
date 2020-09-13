import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IMeeting {
  name: string;
  date: Date;
  start: number;
  end: number;
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
    this.meetingList.push(meeting);
    return of(meeting);
  }

  /**
   * Returns an array of meetings
   */
  public getMeetings(): Observable<IMeeting[]> {
    return of(this.meetingList);
  }
}
