import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; 
import { User } from 'src/app/interface/user';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-schedule-approve',
  templateUrl: './schedule-approve.component.html',
  styleUrls: ['./schedule-approve.component.css']
})
export class ScheduleApproveComponent implements OnInit {
  dorm: Dorm;
  user: User;
  constructor(
    public dialogRef: MatDialogRef<ScheduleApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dormService: DormService,
    private userService: UserService,
    private scheduleService: ScheduleService,
    private dialog: MatDialog
  ){}
    ngOnInit(): void {
        console.log(this.data);
        this.retrieveDorm();
        this.retrieveUser();
    }

    retrieveDorm(): void {
      this.dormService.getDormById(this.data.dorm_id)
        .subscribe({
          next: (data) => {
            this.dorm = data;
            console.log()
          },
          error: (e) => console.error(e)
        });
    }

    retrieveUser(): void {
      this.userService.retrieveUserWithId(this.data.tenant_user_id)
        .subscribe({
          next: (data) => {
              this.user = data;
          },
          error: (e) => console.error(e)
        });
      
        // this.dormService.update(this.data.dorm_id).subscribe({
        //   next: (data) => {
        //   },
        //   error: (e) => console.error(e)
        // });
    }

    approveUserSchedule(schedule_id:any){

      //const incrementValue = this.dorm.visit_counter || 1;

      const data = {
        dorm_id : this.dorm._id,
        approve_visit : true,
        visit_counter : this.dorm.visit_counter
      };

      // var visit_conter = {
      //   visit_counter : incrementValue
      // }

      this.scheduleService.updateSchedule(schedule_id, data).subscribe({
        next: (res) => {
        },
        error: (e) => console.error(e)
      });

    }

    config: SwiperOptions = {
      pagination: { 
        el: '.swiper-pagination', 
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      spaceBetween: 30
    }; 


}
