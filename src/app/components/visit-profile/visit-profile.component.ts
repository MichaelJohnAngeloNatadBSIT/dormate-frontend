import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { DormService } from 'src/app/services/dorm.service';
import { Dorm } from 'src/app/models/dorms.model';
import { SwiperOptions } from 'swiper';
import { Schedule } from 'src/app/models/schedules.model';

import { EventInput } from '@fullcalendar/core';
import { ImageZoomComponent } from 'src/app/dialogs/image-zoom/image-zoom.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visit-profile',
  templateUrl: './visit-profile.component.html',
  styleUrls: ['./visit-profile.component.css']
})
export class VisitProfileComponent implements OnInit {

  currentUser: User;
  user_id: any;
  user : User;
  dorms?: Dorm[];
  schedules?: Schedule[];
  schedulesTenant?: Schedule[];
  schedulesApproved?: Schedule[];
  calendar_events : EventInput[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private dormService: DormService,
  ){
    this.user_id = this.router.getCurrentNavigation().extras.state.user_id;
  }

  ngOnInit(): void {
    this.retrieveUser();
    this.retrieveApprovedDormByUser();

  }


  retrieveUser(){
    this.userService.retrieveUserWithId(this.user_id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveApprovedDormByUser(): void {
    this.dormService.getAllApprovedDormByUser(this.user_id)
      .subscribe({
        next: (data) => {
          this.dorms = data;
        },
        error: (e) => console.error(e)
      });
  }

  openImageZoomDialog(images: any){
    let dialogRef = this.dialog.open(ImageZoomComponent, { 
      width: '900px', 
      height: '70vh',
      data: images
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
