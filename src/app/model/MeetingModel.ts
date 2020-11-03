import {User} from './User';

export class MeetingModel {
  id: number;
  time: Date;
  student: User;
  mentor: User;


  static fromHttpMeeting(httpMeeting: MeetingModel): MeetingModel {
    const meeting = new MeetingModel();
    meeting.id = httpMeeting.id;
    meeting.time = httpMeeting.time;
    meeting.student = httpMeeting.student;
    meeting.mentor = httpMeeting.mentor;
    return meeting;
  }

}
