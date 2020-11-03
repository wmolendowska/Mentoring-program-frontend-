import DateTimeFormat = Intl.DateTimeFormat;
import {fromJSDate} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

export class User {

  id: number;
  username: string;
  // password: string;
  email: string;
  name: string;
  lastName: string;
  // isActive: boolean;
  role: string;
  // mentorId: number;
  deactivationTime: DateTimeFormat;
  tokenExpiryTime: DateTimeFormat;
  // meetings: Array<Meeting>;

  static fromHttp(user: User): User {
    const httpUser = new User();
    httpUser.id = user.id;
    httpUser.name = user.name;
    httpUser.lastName = user.lastName;
    httpUser.email = user.email;
    httpUser.role = user.role;
    return httpUser;
  }

  static fromHttpInactiveUser(user: User): User {
    const httpInactiveUser = new User();
    httpInactiveUser.id = user.id;
    httpInactiveUser.name = user.name;
    httpInactiveUser.lastName = user.lastName;
    httpInactiveUser.email = user.email;
    httpInactiveUser.role = user.role;
    httpInactiveUser.deactivationTime = user.deactivationTime;
    httpInactiveUser.tokenExpiryTime = user.tokenExpiryTime;
    return httpInactiveUser;
  }

}
//
// export enum AuthorityType {
//   STUDENT = 'Student',
//   MENTOR = 'Mentor',
//   ADMIN = 'Admin'
// }
