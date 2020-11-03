import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../model/User';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DataService} from '../../_services/data/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../_services/notification.service';
import {DialogService} from '../../_services/dialog.service';
import {AddUserComponent} from '../add-user/add-user.component';
import {StudentsComponent} from '../students/students.component';
import {MentorDetailsComponent} from '../students/mentor-details/mentor-details.component';
// import {MentorDetailsComponent} from '../students/mentor-details/mentor-details.component';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {

  messageToParent: string;
  users: Array<User>;
  selectedUser: User;
  action: string;
  loadingData = true;
  message = 'Please wait, loading the data...';
  reloadAttempts = 0;
  usersList: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'lastName', 'email', 'role', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogService: DialogService) { }

  loadData() {
    this.dataService.getUsers().subscribe (
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

  createUser() {
    this.dataService.initializeForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this.dialog.open(AddUserComponent, dialogConfig).afterClosed().subscribe(result => {
      this.messageToParent = 'activated';
    });;
  }

  editUser(row) {
    this.dataService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this.dialog.open(AddUserComponent, dialogConfig).afterClosed().subscribe(result => {
      this.loadData();
    });
  }


  deactivateUser(row) {
    this.dialogService.openConfirmDialog('Are you sure you want to deactivate this user?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.dataService.deactivateUser(row.id).subscribe(
          next => {
            this.loadData();
            this.messageToParent = 'deactivated';
            this.notificationService.warn('! Deleted successfully');
          }
        );
      }
    });
  }

  showStudentsMentorDetails(row) {
    this.dataService.studentId = row.id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this.dialog.open(MentorDetailsComponent, dialogConfig);
  }

  showMentorsStudentsList(row) {
    this.dataService.id = row.id;
    this.dataService.mentorFullName = row.name + ' ' + row.lastName;
    this.router.navigate(['students']);
  }

}
