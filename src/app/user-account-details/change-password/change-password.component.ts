import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DataService} from '../../_services/data/data.service';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword: string;
  newPassword: string;

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>,
              private dataService: DataService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  closeForm() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dataService.changePassword(this.oldPassword, this.newPassword).subscribe(
      next => {
        this.closeForm();
        this.notificationService.success('Password  changed successfully');
      }
    );
  }

}
