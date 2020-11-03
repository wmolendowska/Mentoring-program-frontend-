import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DataService} from '../_services/data/data.service';
import {NotificationService} from '../_services/notification.service';
import {User} from '../model/User';
import {ChangePasswordComponent} from './change-password/change-password.component';

@Component({
  selector: 'app-user-account-details',
  templateUrl: './user-account-details.component.html',
  styleUrls: ['./user-account-details.component.css']
})
export class UserAccountDetailsComponent implements OnInit {

  user: User;

  constructor(public dataService: DataService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getUserAccountDetails().subscribe(
      next => {
        this.user = next;
      }
    );
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

}
