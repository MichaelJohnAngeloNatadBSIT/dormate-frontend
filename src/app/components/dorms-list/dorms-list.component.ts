import { Component, OnInit } from '@angular/core';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/interface/user';
import { SwiperOptions } from 'swiper';
import { InfoScheduleDialogComponent } from 'src/app/dialogs/info-schedule-dialog/info-schedule-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageZoomComponent } from 'src/app/dialogs/image-zoom/image-zoom.component';
import { Router } from '@angular/router';
import { FADEINOUT } from './fade-in-fade-out.animation';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dorms-list',
  templateUrl: './dorms-list.component.html',
  animations: [FADEINOUT],
  styleUrls: ['./dorms-list.component.css']
})
export class DormsListComponent implements OnInit{

  //just find user by user id in db to display image

  dorms?: Dorm[];
  currentDorm: Dorm = {};
  currentIndex = -1;
  title = '';
  currentUser: User;
  user : User;
  userImage: any;

  constructor(
    private dormService: DormService, 
    private tokenService: TokenStorageService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    ) { }
  

  ngOnInit(): void {
    this.retrieveDorms();
    this.currentUser = this.tokenService.getUser();
  }

  // getUserById(id:any){
  //   this.userService.retrieveUserWithId(id).subscribe({
  //     next: (data) => {
  //       this.userImage = data;
  //     },
  //     error: (e) => console.error(e)
  //   })
  // }
    retrieveDorms(): void {
      this.dormService.getAllApproved()
        .subscribe({
          next: (data) => {
            this.dorms = data;
          },
          error: (e) => console.error(e)
        });
    }

    // refreshList(): void {
    //   this.retrieveDorms();
    //   this.currentDorm = {};
    //   this.currentIndex = -1;
    // }


    searchTitle(): void {
      this.currentDorm = {};
      this.currentIndex = -1;
  
      this.dormService.findByTitle(this.title)
        .subscribe({
          next: (data) => {
            this.dorms = data;
          },
          error: (e) => console.error(e)
        });
    }

    openInfoSchedDialog(dorm: Dorm){
      var isAuthenticated = this.tokenService.isLoggedIn();
      if (!isAuthenticated) { 
        this.router.navigate(['/login']); 
    }
    else{
      let dialogRef = this.dialog.open(InfoScheduleDialogComponent, { 
        width: '800px', 
        height: '70vh',
        data: {user: this.currentUser, dorm: dorm}
      }); 
    }

    }

    openImageZoomDialog(images: any){
      let dialogRef = this.dialog.open(ImageZoomComponent, { 
        width: '900px', 
        height: '70vh',
        data: images
      }); 
    }

    visitProfile(user_id: any){
      this.router.navigate(['visit-profile'], {state: {user_id: user_id}})
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



