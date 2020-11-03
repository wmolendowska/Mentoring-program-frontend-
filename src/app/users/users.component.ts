import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/User';
import {DataService} from '../_services/data/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddUserComponent} from './add-user/add-user.component';
import {NotificationService} from '../_services/notification.service';
import {DialogService} from '../_services/dialog.service';
import {DeactivatedUsersComponent} from './deactivated-users/deactivated-users.component';
import {ActiveUsersComponent} from './active-users/active-users.component';
import {PendingConfirmationUsersComponent} from './pending-confirmation-users/pending-confirmation-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  @ViewChild(DeactivatedUsersComponent) deactivatedUserComponent;
  @ViewChild(ActiveUsersComponent) activeUserComponent;
  @ViewChild(PendingConfirmationUsersComponent) pendingConfirmationUserComponent;


  constructor() { }

  ngAfterViewInit() {
  }

  reloadDeactivatedUsersComponentData() {
    if (this.activeUserComponent.messageToParent === 'deactivated') {
      this.deactivatedUserComponent.loadData();
      this.activeUserComponent.messageToParent = '';
    }
  }

  reloadPendingConfirmationUsersComponentData() {
    if (this.deactivatedUserComponent.messageToParent === 'activated' || this.activeUserComponent.messageToParent === 'activated') {
      this.pendingConfirmationUserComponent.loadData();
      this.deactivatedUserComponent.messageToParent = '';
      this.activeUserComponent.messageToParent = '';
    }
  }

  onTabChange($event) {
    if ($event === 1) {
      this.reloadDeactivatedUsersComponentData();
    }
    if ($event === 2) {
      this.reloadPendingConfirmationUsersComponentData();
    }
  }

}
