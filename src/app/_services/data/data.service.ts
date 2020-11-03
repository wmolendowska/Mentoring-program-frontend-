import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec} from '@angular/common/http';
import {User} from '../../model/User';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {MeetingModel} from '../../model/MeetingModel';

const AUTH_API = 'http://localhost:8080';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  id: number; // mentor id
  studentId: number;
  mentorFullName: string;
  meetingDate: Date;
  timeZoneOffset = new Date().getTimezoneOffset();
  offsetHours = Math.abs(this.timeZoneOffset / 60);
  offsetMin = Math.abs(this.timeZoneOffset % 60);
  timezone: string;

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    role: new FormControl('ADMIN')
  });

  initializeForm() {
    this.form.setValue({
      id: null,
      name: '',
      lastName: '',
      email: '',
      role: 'Admin'
    });
  }

  populateForm(user) {
    this.form.setValue(_.omit(user));
  }


  validateUser(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      username, password
    }, {observe: 'response'});
  }

  getOffsetHours() {
    if (this.offsetHours < 10) {
      return '0' + this.offsetHours;
    } else {
      return this.offsetHours + '';
    }
  }

  getOffsetMinutes() {
    if (this.offsetMin < 10) {
      return '0' + this.offsetMin;
    } else {
      return this.offsetMin + '';
    }
  }

  getTimezoneOffset(): string {
    if (this.timeZoneOffset < 0) {
      return this.timezone = '+' + this.getOffsetHours() + ':' + this.getOffsetMinutes();
    } else if (this.timeZoneOffset < 0) {
      return this.timezone = '+' + this.getOffsetHours() + ':' + this.getOffsetMinutes();
    } else if (this.timeZoneOffset === 0) {
      return this.timezone = 'Z';
    }
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(AUTH_API + '/admin/users')
      .pipe(
        map(data => {
          const users = new Array<User>();
          for (const user of data) {
            users.push(User.fromHttp(user));
          }
          return users;
        })
      );
  }

  getDeactivatedUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(AUTH_API + '/admin/deactivatedUsers')
      .pipe(
        map(data => {
          const deactivatedUsers = new Array<User>();
          for (const deactivatedUser of data) {
            deactivatedUsers.push(User.fromHttpInactiveUser(deactivatedUser));
          }
          return deactivatedUsers;
        })
      );
  }

  getPendingUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(AUTH_API + '/admin/pendingUsers')
      .pipe(
        map(data => {
          const deactivatedUsers = new Array<User>();
          for (const deactivatedUser of data) {
            deactivatedUsers.push(User.fromHttpInactiveUser(deactivatedUser));
          }
          return deactivatedUsers;
        })
      );
  }

  addUser(newUser: User): Observable<User> {
    const userAccount = {name: newUser.name, lastName: newUser.lastName, email: newUser.email, role: newUser.role};
    const param = new HttpParams().append('apUrl', 'localhost:4200');
    return this.http.post<User>(AUTH_API + '/newUser', userAccount);
  }

  editUser(newUser: User): Observable<User> {
    const userAccount = {name: newUser.name, lastName: newUser.lastName, email: newUser.email, role: newUser.role};
    return this.http.put<User>(AUTH_API + '/admin/editUser/' + newUser.id, userAccount);
  }

  deactivateUser(id): Observable<any> {
    const params = new HttpParams().append('id', id);
    return this.http.post(AUTH_API + '/admin/deactivateUser', params);
  }

  activateUser(id): Observable<any> {
    const param = new HttpParams().append('id', id);
    return this.http.post(AUTH_API + '/admin/activateUser', param);
  }

  getMentorMeetingsForDate(date): Observable<Array<MeetingModel>> {
    return this.http.get<Array<MeetingModel>>(AUTH_API + '/mentor/meetingsForDate/' + date)
      .pipe(
        map(data => {
          const meetings = new Array<MeetingModel>();
          for (const meeting of data) {
            meetings.push(MeetingModel.fromHttpMeeting(meeting));
          }
          return meetings;
        })
      );
  }

  getAdminMeetingsForDate(date): Observable<Array<MeetingModel>> {
    return this.http.get<Array<MeetingModel>>(AUTH_API + '/admin/meetingsForDate/' + date)
      .pipe(
        map(data => {
          const meetings = new Array<MeetingModel>();
          for (const meeting of data) {
            meetings.push(MeetingModel.fromHttpMeeting(meeting));
          }
          return meetings;
        })
      );
  }

  getStudentsList(mentorId): Observable<Array<User>> {
    let path = '';
    if (mentorId !== 0) {
      path = '/students/' + mentorId;
    } else {
      path = '/students';
    }

    return this.http.get<Array<User>>(AUTH_API + path)
      .pipe(
        map(data => {
          const students = new Array<User>();
          for (const student of data) {
            students.push(User.fromHttp(student));
          }
          return students;
        })
      );
  }

  releaseStudent(id): Observable<any> {
    const param = new HttpParams().append('id', id);
    return this.http.post(AUTH_API + '/releaseStudent', param);
  }

  assignStudent(id): Observable<any> {
    const param = new HttpParams().append('id', id);
    return this.http.post(AUTH_API + '/mentor/assignStudent', param);
  }

  getUnassignedStudents(): Observable<Array<User>> {
    return this.http.get<Array<User>>(AUTH_API + '/unassignedStudents')
      .pipe(
        map(data => {
          const students = new Array<User>();
          for (const student of data) {
            students.push(User.fromHttp(student));
          }
          return students;
        })
      );
  }

  getStudentsMentor(id): Observable<User> {
    return this.http.get<User>(AUTH_API + '/admin/studentsMentor/' + id)
      .pipe(map ( data => {
        return User.fromHttp(data);
    }
        )
      );
  }

  getLocalDate(time: Date) {
    return time.toLocaleDateString().split('.')[2] + '-' + time.toLocaleDateString().split('.')[1] + '-' + time.toLocaleDateString().split('.')[0];
  }

  addMeetings(startTime, endTime): Observable<any> {
    const from = this.getLocalDate(this.meetingDate) + 'T' + startTime + ':00' + this.getTimezoneOffset();
    const to = this.getLocalDate(this.meetingDate) + 'T' + endTime + ':00' + this.getTimezoneOffset();
    // @ts-ignore
    return this.http.post(AUTH_API + '/mentor/addMeetings/' + from + '/' + to);
  }

  cancelMeeting(meetingId): Observable<any> {
    const param = new HttpParams().append('id', meetingId);
    return this.http.post(AUTH_API + '/cancelMeeting', param);
  }

  getStudentMeetingsForDate(date): Observable<Array<MeetingModel>> {
    return this.http.get<Array<MeetingModel>>(AUTH_API + '/student/meetingsForDate/' + date)
      .pipe(
        map(data => {
          const meetings = new Array<MeetingModel>();
          for (const meeting of data) {
            meetings.push(MeetingModel.fromHttpMeeting(meeting));
          }
          return meetings;
        })
      );
  }

  getStudentsMentorCalendar(date): Observable<Array<MeetingModel>> {
    return this.http.get<Array<MeetingModel>>(AUTH_API + '/student/mentorCalendarForDate/' + date)
      .pipe(
        map(data => {
          const meetings = new Array<MeetingModel>();
          for (const meeting of data) {
            meetings.push(MeetingModel.fromHttpMeeting(meeting));
          }
          console.log(meetings);
          return meetings;
        })
      );
  }

  bookMeeting(meetingId): Observable<any> {
    const param = new HttpParams().append('id', meetingId);
    return this.http.post(AUTH_API + '/student/bookMeeting', param);
  }

  getUserAccountDetails(): Observable<User> {
    return this.http.get<User>(AUTH_API + '/userAccountDetails')
      .pipe(map ( data => {
          return User.fromHttp(data);
        }
        )
      );
  }

  changePassword(oldPassword, newPassword): Observable<any> {
    const params = new HttpParams().append('oldPassword', oldPassword).append('newPassword', newPassword);
    return this.http.post(AUTH_API + '/changePassword', params);
  }

  registrationComplete(token, password): Observable<any> {
    const param = new HttpParams().append('password', password);
    return this.http.post(AUTH_API + '/newUser/registrationConfirm/' + token, param);
  }

}
