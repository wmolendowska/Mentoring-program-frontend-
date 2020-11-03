import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../_services/data/data.service';
import {NotificationService} from '../_services/notification.service';
import {TokenStorageService} from '../_services/auth/token-storage.service';

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.css']
})
export class RegistrationConfirmComponent implements OnInit {

  token: string;
  password: string;
  repeatPassword: string;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private notificationService: NotificationService,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });

    console.log(this.token);
  }

  onSubmit() {
    if (this.password === this.repeatPassword) {
      this.dataService.registrationComplete(this.token, this.password).subscribe(
        next => {
          this.tokenStorage.signOut();
          this.notificationService.success('Your account has been activated');
          this.router.navigate(['login']);
        }
      );
    }
  }

}
