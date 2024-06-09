import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { Subscription } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { ImageZoomComponent } from 'src/app/dialogs/image-zoom/image-zoom.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { InfoScheduleDialogComponent } from 'src/app/dialogs/info-schedule-dialog/info-schedule-dialog.component';
import { User } from 'src/app/interface/user';
import { Review } from 'src/app/interface/review';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dorm',
  templateUrl: './dorm.component.html',
  styleUrls: ['./dorm.component.css']
})
export class DormComponent {
dorm_id : string;
dorm: Dorm;
currentUser: User;
currentUserTemp: User;
reviews: Review[];
  constructor(
                private route: ActivatedRoute, 
                private dormService: DormService, 
                private userService: UserService,
                private dialog: MatDialog,
                private tokenService: TokenStorageService,
                private router: Router,
                private snackBar: MatSnackBar,
            ) {}
    ngOnInit() {
      this.dorm_id = this.route.snapshot.paramMap.get('id');

      this.dormService.getDormById(this.dorm_id).subscribe({
        next: (data) => {
          this.dorm = data;
          this.reviews = this.dorm.tenantReviews;
        },
        error: (e) => console.error(e)
      })

      this.currentUser = this.tokenService.getUser();

      // this.userService.retrieveUserWithId(this.currentUserTemp.id).subscribe((data)=>{
      //   this.currentUser = data
      //   console.log(this.currentUser);
      // });
    }

    openImageZoomDialog(images: any){
      let dialogRef = this.dialog.open(ImageZoomComponent, { 
        width: '900px', 
        height: '70vh',
        data: images
      }); 
    }

    
    openInfoSchedDialog(dorm: Dorm){
      if(this.currentUser.verified == true){
      var isAuthenticated = this.tokenService.isLoggedIn();
      if (!isAuthenticated) { 
        this.router.navigate(['/login']); 
       }
    else{
      
      let dialogRef = this.dialog.open(InfoScheduleDialogComponent, { 
        width: '600px',
        height: '400px', 
        data: {user: this.currentUser, dorm: dorm}
      }); 
    }
    } else{
      this.showSnackbarTopPosition('Please Make Your account Verified by Uploading a Valid ID','Ok', '10000')
      this.router.navigate(['/profile']);
    }

  }

  showSnackbarTopPosition(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['custom-style']
    });
  }


    config: SwiperOptions = {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
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
