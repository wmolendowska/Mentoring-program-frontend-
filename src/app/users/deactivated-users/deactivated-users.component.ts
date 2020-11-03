import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../_services/data/data.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../model/User';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DialogService} from '../../_services/dialog.service';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-deactivated-users',
  templateUrl: './deactivated-users.component.html',
  styleUrls: ['./deactivated-users.component.css']
})
export class DeactivatedUsersComponent implements OnInit {


  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private notificationService: NotificationService) { }

  messageToParent: string;
  deactivatedUsers: Array<User>;
  loadingData = true;
  deactivatedUsersList: MatTableDataSource<User>;
  message = 'Please wait, loading the data...';
  action: string;
  reloadAttempts = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'lastName', 'email', 'deactivationTime', 'actions'];
  searchKey: string;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getDeactivatedUsers().subscribe (
      (next) => {
        this.deactivatedUsers = next;
        this.loadingData = false;
        this.processUrlParams();
        this.deactivatedUsersList = new MatTableDataSource<User>(this.deactivatedUsers);
        this.deactivatedUsersList.sort = this.sort;
        this.deactivatedUsersList.paginator = this.paginator;
        if (this.deactivatedUsers == null || this.deactivatedUsers.length === 0) {
          this.message = 'No data.';
        }
      },
      (error => {
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
      })
    );
  }

  processUrlParams() {
    this.route.queryParams.subscribe(
      (params) => {
        // const id = params['id'];
        this.action = params['action'];
        // if(id){
        //   this.selectedUser = this.users.find(user => user.id === +id);
        // }
      }
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.deactivatedUsersList.filter = this.searchKey.trim().toLowerCase();
  }

  activateUser(row) {
    this.dialogService.openConfirmDialog('Are you sure you want activate this user?')
      .afterClosed().subscribe( res => {
        if (res) {
          this.dataService.activateUser(row.id).subscribe(
            next => {
              this.notificationService.success('User activated successfully');
              this.loadData();
              this.messageToParent = 'activated';
            }
          );
        }
      }
    );
    }

}
