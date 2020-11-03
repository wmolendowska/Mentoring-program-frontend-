import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  name: string;
  password: string;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // this.subscription = this.authService.authenticationResultEvent.subscribe(
    //   result => {
    //     if (result) {
    //       const url = this.activatedRouter.snapshot.queryParams['requested'];
    //       this.router.navigateByUrl(url);
    //     }
    //     else {
    //       this.message = "Wrong username or password";
    //     }
    //   }
    // );
    if (this.authService.checkIfAuthenticated()) {
      const url = this.activatedRouter.snapshot.queryParams['requested'];
      this.router.navigateByUrl(url);
    }
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  onSubmit() {
    this.authService.authenticationResultEvent.subscribe(
        result => {
          if (result) {
            // const url = this.activatedRouter.snapshot.queryParams['requested'];
            // this.router.navigateByUrl(url);
            window.location.reload();
          }
          else {
            this.message = "Wrong username or password";
          }
        }
      );
    this.authService.authenticate(this.name, this.password);
  }


}
