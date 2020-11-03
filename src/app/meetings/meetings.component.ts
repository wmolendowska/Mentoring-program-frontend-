import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../_services/data/data.service';
import {MeetingModel} from '../model/MeetingModel';
import {TokenStorageService} from '../_services/auth/token-storage.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddUserComponent} from '../users/add-user/add-user.component';
import {AddMeetingsComponent} from './add-meetings/add-meetings.component';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {DialogService} from '../_services/dialog.service';
import {NotificationService} from '../_services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  date = new Date();
  meetings: Array<MeetingModel>;
  action: string;
  loadingData = true;
  message = '';
  reloadAttempts = 0;
  isBookingModule: boolean;

  constructor(private dataService: DataService,
              private tokenStorage: TokenStorageService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private notificationService: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.url);
    if (!this.route.snapshot.url[1]){
      this.isBookingModule = false;
      this.loadData();
    } else if (this.route.snapshot.url[1].path === 'booking') {
      this.isBookingModule = true;
      this.loadBookingData();
    }
  }

  getRole(): string {
    return this.tokenStorage.getUserRole();
  }

  onError(error) {
    if (error.status === 404) {
      this.message = 'Something, page not found';
    } else {
      if (this.reloadAttempts <= 10) {
        this.message = 'Something went wrong, trying again ...';
        this.reloadAttempts++;
        this.loadData();
      } else {
        this.message = 'Something went wrong, please contact support';
      }
    }
  }

  loadBookingData() {
    this.dataService.getStudentsMentorCalendar(this.dataService.getLocalDate(this.date) + 'T00:00:00' + this.dataService.getTimezoneOffset()).subscribe(
      next => {
        this.meetings = next;
        if (next.length === 0) {
          this.message = 'No meetings ' + this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
        } else {
          this.message = '';
        }
      }, (error => {
        this.onError(error);
      })
    );
  }

  loadData() {
    if (this.getRole() === 'ROLE_ADMIN') {
      this.dataService.getAdminMeetingsForDate(this.dataService.getLocalDate(this.date) + 'T00:00:00' + this.dataService.getTimezoneOffset()).subscribe(
        next => {
          this.meetings = next;
          if (next.length === 0) {
            this.message = 'No meetings ' + this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
          } else {
            this.message = '';
          }
        }, (error => {
          this.onError(error);
        })
      );
    } else if (this.getRole() === 'ROLE_MENTOR') {
        this.dataService.getMentorMeetingsForDate(this.dataService.getLocalDate(this.date) + 'T00:00:00' + this.dataService.getTimezoneOffset()).subscribe(
        next => {
          this.meetings = next;
        }, (error => {
          this.onError(error);
        })
      );
    } else if (this.getRole() === 'ROLE_STUDENT') {
      this.dataService.getStudentMeetingsForDate(this.dataService.getLocalDate(this.date) + 'T00:00:00' + this.dataService.getTimezoneOffset()).subscribe(
        next => {
          this.meetings = next;
        }, (error => {
          this.onError(error);
        })
      );
    }
  }

  addMeetings() {
    this.dataService.meetingDate = this.date;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(AddMeetingsComponent, dialogConfig).afterClosed().subscribe(() => {
      if (this.dialogService.addingMeetingsSuccess) {
        this.loadData();
      }
    });
  }

  cancelMeeting(meeting) {
    this.dialogService.openConfirmDialog('Are you sure you want to cancel this meeting?')
      .afterClosed().subscribe( res => {
        if (res) {
          this.dataService.cancelMeeting(meeting.id).subscribe(
            next => {
              this.notificationService.warn('Meeting canceled successfully');
              this.loadData();
            }

          );
        }
    });
  }

  bookMeeting(meeting) {
    this.dialogService.openConfirmDialog('Are you sure you want to book this meeting?')
      .afterClosed().subscribe( res => {
      if (res) {
        this.dataService.bookMeeting(meeting.id).subscribe(
          next => {
            this.notificationService.success('Meeting canceled successfully');
            this.loadBookingData();
          }

        );
      }
    });
  }

}
