import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Time} from '@angular/common';
import {DataService} from '../../_services/data/data.service';
import {NotificationService} from '../../_services/notification.service';
import {DialogService} from '../../_services/dialog.service';

@Component({
  selector: 'app-add-meetings',
  templateUrl: './add-meetings.component.html',
  styleUrls: ['./add-meetings.component.css']
})
export class AddMeetingsComponent implements OnInit {

  startTime: Time;
  endTime: Time;

  constructor(private dialogRef: MatDialogRef<AddMeetingsComponent>,
              private dataService: DataService,
              private notificationService: NotificationService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dataService.addMeetings(this.startTime, this.endTime).subscribe(
      next => {
        this.dialogService.addingMeetingsSuccess = true;
        console.log(this.dialogService.addingMeetingsSuccess);
        this.close();
        this.notificationService.success('Meetings added successfully');
      }
    );
  }
}
