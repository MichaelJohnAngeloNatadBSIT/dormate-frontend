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


@Component({
  selector: 'app-dorm',
  templateUrl: './dorm.component.html',
  styleUrls: ['./dorm.component.css']
})
export class DormComponent {
dorm_id : string;
dorm: Dorm;
currentUser: User;
  constructor(
                private route: ActivatedRoute, 
                private dormService: DormService, 
                private dialog: MatDialog,
                private tokenService: TokenStorageService,
                private router: Router
            ) {}
    ngOnInit() {
      this.dorm_id = this.route.snapshot.paramMap.get('id');

      this.dormService.getDormById(this.dorm_id).subscribe({
        next: (data) => {
          this.dorm = data;
        },
        error: (e) => console.error(e)
      })

      this.currentUser = this.tokenService.getUser();
    }

    openImageZoomDialog(images: any){
      let dialogRef = this.dialog.open(ImageZoomComponent, { 
        width: '900px', 
        height: '70vh',
        data: images
      }); 
    }

    
    openInfoSchedDialog(dorm: Dorm){
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
