import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from '../data/data.service';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  role: string;
  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();

  constructor(private dataService: DataService, private tokenStorage: TokenStorageService) { }

  authenticate(username: string, password: string) {
    this.dataService.validateUser(username, password).subscribe(
      (next) => {
        console.log(next.headers.get('Authorization'));
        this.token = next.headers.get('Authorization');
        this.tokenStorage.saveToken(this.token); // next.accessToken
        this.tokenStorage.saveUserRole(this.getRole());
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    );
  }

  checkIfAuthenticated(): boolean {
    if (this.tokenStorage.getToken()) {
      this.isAuthenticated = true;
      this.role = this.tokenStorage.getUserRole();
      return true;
    }
    // this.dataService.getRole().subscribe(
    //   role => {
    //     if (this.role !== null) {
    //       this.isAuthenticated = true;
    //       this.authenticationResultEvent.emit(true);
    //     }
    //   }
    // );
  }

  getRole(): string {
    if (this.tokenStorage.getToken() == null) { return null; }
    const encodedPayload = this.tokenStorage.getToken().split('.')[1];
    const payload = atob(encodedPayload);
    return JSON.parse(payload).authorities[0].authority;
  }

}
