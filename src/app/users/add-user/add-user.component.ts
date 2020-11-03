import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../_services/data/data.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddUserComponent>,
              public dataService: DataService,
              private notificationService: NotificationService) { }


  ngOnInit(): void {
  }

  clearForm() {
    this.dataService.form.reset();
    this.dataService.initializeForm();
  }

  onSubmit() {
    if (this.dataService.form.valid) {
      if (!this.dataService.form.get('id').value) {
        this.dataService.addUser(this.dataService.form.value).subscribe(
          next =>
            this.notificationService.success('User added successfully')
        );
      } else {
        this.dataService.editUser(this.dataService.form.value).subscribe(
          next => {
            this.notificationService.success('User updated successfully');
          });
      }
      this.dataService.form.reset();
      this.dataService.initializeForm();
      this.closeForm();
    }
  }

  closeForm() {
    this.dataService.form.reset();
    this.dataService.initializeForm();
    this.dialogRef.close();
  }

}
