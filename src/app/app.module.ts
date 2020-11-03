import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddUserComponent } from './users/add-user/add-user.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {authInterceptorProviders} from './_services/auth/auth.interceptor';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PendingConfirmationUsersComponent } from './users/pending-confirmation-users/pending-confirmation-users.component';
import { DeactivatedUsersComponent } from './users/deactivated-users/deactivated-users.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { MeetingsComponent } from './meetings/meetings.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { ActiveUsersComponent } from './users/active-users/active-users.component';
import { StudentsComponent } from './users/students/students.component';
import { UnassignedStudentsComponent } from './users/students/unassigned-students/unassigned-students.component';
import { MentorDetailsComponent } from './users/students/mentor-details/mentor-details.component';
import { AddMeetingsComponent } from './meetings/add-meetings/add-meetings.component';
import { UserAccountDetailsComponent } from './user-account-details/user-account-details.component';
import { ChangePasswordComponent } from './user-account-details/change-password/change-password.component';
import { RegistrationConfirmComponent } from './registration-confirm/registration-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    AddUserComponent,
    PendingConfirmationUsersComponent,
    DeactivatedUsersComponent,
    MatConfirmDialogComponent,
    NavComponent,
    MeetingsComponent,
    ActiveUsersComponent,
    StudentsComponent,
    UnassignedStudentsComponent,
    MentorDetailsComponent,
    AddMeetingsComponent,
    UserAccountDetailsComponent,
    ChangePasswordComponent,
    RegistrationConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    LayoutModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [authInterceptorProviders, MatSnackBar],
  bootstrap: [AppComponent],
  entryComponents: [AddUserComponent, MatConfirmDialogComponent]
})
export class AppModule { }
