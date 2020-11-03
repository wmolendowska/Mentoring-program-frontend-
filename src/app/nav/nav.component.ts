import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../_services/auth/token-storage.service';
import {query} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn = false;
  module: string;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private tokenStorage: TokenStorageService) {}



  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
  }

  getRole(): string {
    return this.tokenStorage.getUserRole();
  }

  navigateToLoginPage(){
    this.router.navigate(['login']);
  }

  navigateToUsers() {
    this.router.navigate(['users']);
  }

  navigateToStudents() {
    this.router.navigate(['students']);
  }

  navigateToMeetings() {
    this.router.navigate(['meetings']);
  }

  navigateToBookMeetings() {
    this.router.navigate(['meetings', 'booking']);
  }

  navigateToUnassignedStudents() {
    this.router.navigate(['unassignedStudents']);
  }

  navigateToUserAccountDetails() {
    this.router.navigate(['myAccount']);
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
