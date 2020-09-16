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

  /**
   * Given a day, returns an array of meetings
   */
  public getMeetingsByDay(day: Date): Observable<IMeeting[]> {
    const result = this.meetingList.filter(meeting => {
      return meeting.date.getDate() === day.getDate();
    });
    return of(result);
  }

  /**
   * Given an array of users, returns an array of meetings
   */
  public getMeetingsByUser(userList: number[]): Observable<IMeeting[]> {
    const result: IMeeting[] = [];
    this.meetingList.forEach(meeting => {
      userList.forEach(user => {
        meeting.participants.forEach(participant => {
          if (participant === user && result.indexOf(meeting) === -1) {
            result.push(meeting);
          }
        });
      });
    });
    return of(result);
  }
}
