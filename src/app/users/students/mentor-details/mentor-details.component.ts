import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DataService} from '../../../_services/data/data.service';
import {User} from '../../../model/User';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.css']
})
export class MentorDetailsComponent implements OnInit {

  mentor: User;

  constructor(private dialogRef: MatDialogRef<MentorDetailsComponent>,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getStudentsMentor(this.dataService.studentId).subscribe(
      next => {
        this.mentor = next;
      },
      // (error => {
      //     if (error.status === 404) {
      //       this.message = 'Something, page not found';
      //     } else {
      //       if (this.reloadAttempts <= 10) {
      //         this.message = 'Something went wrong, trying again ...';
      //         this.reloadAttempts++;
      //         this.loadData();
      //       } else {
      //         this.message = 'Something went wrong, please contact support';
      //       }
      //     }
      //   })
    );
  }

  close() {
    this.dialogRef.close();
  }

}
