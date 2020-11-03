import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/User';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DataService} from '../../_services/data/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../_services/notification.service';
import {DialogService} from '../../_services/dialog.service';
import {TokenStorageService} from '../../_services/auth/token-storage.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  id: number;
  mentorFullName: string;
  messageToParent: string;
  users: Array<User>;
  selectedUser: User;
  action: string;
  loadingData = true;
  message = 'Please wait, loading the data...';
  reloadAttempts = 0;
  usersList: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'lastName', 'email', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private tokenStorage: TokenStorageService) { }

  error() {
    if (this.reloadAttempts <= 10) {
      this.message = 'Something went wrong, trying again ...';
      this.reloadAttempts++;
      this.loadData();
    } else {
      this.message = 'Something went wrong, please contact support';
    }
  }

  navigateToUsers() {
    this.router.navigate(['users']);
  }

  getRole() {
    return this.tokenStorage.getUserRole();
  }

  loadData() {
    // this.processUrlParams();
    if (this.getRole() === 'ROLE_ADMIN') {
      this.mentorFullName = this.dataService.mentorFullName;
      this.dataService.getStudentsList(this.dataService.id).subscribe(
        (next) => {
          this.users = next;
          this.loadingData = false;
          this.usersList = new MatTableDataSource<User>(this.users);
          this.usersList.sort = this.sort;
          this.usersList.paginator = this.paginator;
          if (this.users == null || this.users.length === 0) {
            this.message = 'No data.';
          }
        },
        (error => {
          if (error.status === 404) {
            this.message = 'Something, page not found';
          } else {
            console.error();
          }
        })
      );
    } else if (this.getRole() === 'ROLE_MENTOR') {
      this.dataService.getStudentsList(0).subscribe(
        (next) => {
          this.users = next;
          this.loadingData = false;
          this.usersList = new MatTableDataSource<User>(this.users);
          this.usersList.sort = this.sort;
          this.usersList.paginator = this.paginator;
          if (this.users == null || this.users.length === 0) {
            this.message = 'No data.';
          }
        },
        (error => {
          if (error.status === 404) {
            this.message = 'Something, page not found';
          } else {
            console.error();
          }
        })
      );
    }
  }

  // processUrlParams() {
  //   this.route.queryParams.subscribe(
  //     (params) => {
  //       this.id = params['id'];
  //       this.action = params['action'];
  //     }
  //   );
  // }



  ngOnInit(): void {
    this.loadData();
  }


  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.usersList.filter = this.searchKey.trim().toLowerCase();
  }


  releaseStudent(row) {
    this.dialogService.openConfirmDialog('Are you sure you want to release this student?')
      .afterClosed().subscribe(
        res => {
          if (res) {
            this.dataService.releaseStudent(row.id).subscribe(
              next => {
                this.notificationService.success('Student released successfully');
                this.loadData();
              }
            );
          }
        }
    );
  }

}
