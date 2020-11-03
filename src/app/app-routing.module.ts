import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {AuthRouteGuardService} from './_services/auth/auth-route-guard.service';
import {PendingConfirmationUsersComponent} from './users/pending-confirmation-users/pending-confirmation-users.component';
import {DeactivatedUsersComponent} from './users/deactivated-users/deactivated-users.component';
import {MeetingsComponent} from './meetings/meetings.component';
import {StudentsComponent} from './users/students/students.component';
import {UnassignedStudentsComponent} from './users/students/unassigned-students/unassigned-students.component';
import {UserAccountDetailsComponent} from './user-account-details/user-account-details.component';
import {RegistrationConfirmComponent} from './registration-confirm/registration-confirm.component';


const routes: Routes = [
  {path: 'registrationConfirm', component : RegistrationConfirmComponent},
  {path: 'users', component : UsersComponent, canActivate: [AuthRouteGuardService]},
  {path: 'students', component : StudentsComponent, canActivate: [AuthRouteGuardService]},
  {path: 'unassignedStudents', component : UnassignedStudentsComponent, canActivate: [AuthRouteGuardService]},
  {path: 'meetings', component : MeetingsComponent, canActivate: [AuthRouteGuardService]},
  {path: 'meetings/booking', component : MeetingsComponent, canActivate: [AuthRouteGuardService]},
  {path: 'myAccount', component : UserAccountDetailsComponent, canActivate: [AuthRouteGuardService]},
  {path: 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
