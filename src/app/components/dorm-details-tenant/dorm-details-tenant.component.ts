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
import { Review } from 'src/app/interface/review';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-dorm-details-tenant',
  templateUrl: './dorm-details-tenant.component.html',
  styleUrls: ['./dorm-details-tenant.component.css']
})
export class DormDetailsTenantComponent {
  dorm_id : string;
  dorm: Dorm;
  currentUser: User;
  currentRating: number = 0; // Initial rating value
  review : any[];
  reviews : Review[];
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
            this.reviews = this.dorm.tenantReviews;
          },
          error: (e) => console.error(e)
        })
  
        this.currentUser = this.tokenService.getUser();
        console.log(this.currentUser);
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

    // onRatingUpdated(rating: number) {
    //   console.log('Rating updated to:', rating);
    //   this.currentRating = rating;
    // }


    reviewText: string = '';

    onRatingUpdated(newRating: number): void {
      this.currentRating = newRating;
    }

    onSubmit(): void {
      this.review = [{
        tenant_star_rating: this.currentRating,
        tenant_user_id: this.currentUser.id,
        tenant_username: this.currentUser.username,
        tenant_user_image: this.currentUser.user_image,
        tenant_full_name: this.currentUser.first_name +" "+ this.currentUser.last_name,
        tenant_review: this.reviewText
      }];

      this.dormService.addReview(this.dorm_id, this.review).subscribe({
        next: (res) => {
  
        },
        error: (e) => console.error(e)
      }
      )

      // "tenant_star_rating": 5,
      // "tenant_user_id": "655c8f5ec50398845a3590b4",
      // "tenant_full_name": "angelo updated natad",
      // "tenant_username": "hakaylo",
      // "tenant_review": "test review"
      if (this.reviewText && this.currentRating) {
        console.log('Rating:', this.currentRating);
        console.log('Review:', this.reviewText);
        


      }
    }
  }
