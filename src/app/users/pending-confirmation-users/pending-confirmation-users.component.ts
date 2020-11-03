import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../_services/data/data.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../model/User';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-pending-confirmation-users',
  templateUrl: './pending-confirmation-users.component.html',
  styleUrls: ['./pending-confirmation-users.component.css']
})
export class PendingConfirmationUsersComponent implements OnInit {

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  deactivatedUsers: Array<User>;
  loadingData = true;
  deactivatedUsersList: MatTableDataSource<User>;
  message = 'Please wait, loading the data...';
  action: string;
  reloadAttempts = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'lastName', 'email', 'creationAccountTime', 'tokenExpiryDate'];
  searchKey: string;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getPendingUsers().subscribe (
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


}
