import { Component, OnInit } from '@angular/core';
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
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/models/schedules.model';
import { EventInput } from '@fullcalendar/core';
import { CertificateUploadDialogComponent } from 'src/app/dialogs/certificate-upload-dialog/certificate-upload-dialog.component';
import { PaymentDialogComponent } from 'src/app/dialogs/payment-dialog/payment-dialog.component';
import { DormImagesUploadDialogComponent } from 'src/app/dialogs/dorm-images-upload-dialog/dorm-images-upload-dialog.component';
import { EditDormInfoDialogComponent } from 'src/app/dialogs/edit-dorm-info-dialog/edit-dorm-info-dialog.component';
import { DeleteDormDialogComponent } from 'src/app/dialogs/delete-dorm-dialog/delete-dorm-dialog.component';
import { PublishDialogComponent } from 'src/app/dialogs/publish-dialog/publish-dialog.component';

@Component({
  selector: 'app-dorm-details-landlord',
  templateUrl: './dorm-details-landlord.component.html',
  styleUrls: ['./dorm-details-landlord.component.css'],
})
export class DormDetailsLandlordComponent implements OnInit {
  dorm_id: string;
  dorm: Dorm;
  currentUser: User;
  user : User;
  dorms?: Dorm[];
  schedules?: Schedule[];
  schedulesTenant?: Schedule[];
  schedulesApproved?: Schedule[];
  calendar_events : EventInput[] = [];
  constructor(
    private tokenService: TokenStorageService,
    private userService: UserService,
    private dialog: MatDialog,
    private dormService: DormService,
    private chatService: ChatService,
    private scheduleService: ScheduleService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.dorm_id = this.route.snapshot.paramMap.get('id');

    this.dormService.getDormById(this.dorm_id).subscribe({
      next: (data) => {
        this.dorm = data;
      },
      error: (e) => console.error(e),
    });

    this.currentUser = this.tokenService.getUser();

      this.currentUser = this.tokenService.getUser();
      // this.retrieveUser();
      this.retrieveDorm();
  }
  
  retrieveDorm(): void {
    this.dormService.getDormById(this.dorm_id)
      .subscribe({
        next: (data) => {
          this.dorm = data;
        },
        error: (e) => console.error(e)
      });
  }

  openImageZoomDialog(images: any) {
    let dialogRef = this.dialog.open(ImageZoomComponent, {
      width: '900px',
      height: '70vh',
      data: images,
    });
  }

  openInfoSchedDialog(dorm: Dorm) {
    var isAuthenticated = this.tokenService.isLoggedIn();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    } else {
      let dialogRef = this.dialog.open(InfoScheduleDialogComponent, {
        width: '600px',
        height: '400px',
        data: { user: this.currentUser, dorm: dorm },
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
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
  };

  openCertUploadDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(CertificateUploadDialogComponent, {
      width: '900px',
      height: '80vh',
      data: dorm,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.retrieveDorm();
    });
  }

  openPaymentDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(PaymentDialogComponent, {
      data: dorm,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.retrieveDorm();
    });
  }

  openDormImgUploadDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(DormImagesUploadDialogComponent, {
      width: '900px',
      height: '80vh',
      data: dorm,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.retrieveDorm();
    });
  }
  openEditDormDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(EditDormInfoDialogComponent, {
      width: '900px',
      height: '80vh',
      data: dorm,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.retrieveDorm();
    });
  }

  openDeleteDormDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(DeleteDormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: dorm,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.retrieveDorm();
    });
  }

  openPublishDormDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(PublishDialogComponent, {
      width: '400px',
      height: 'auto',
      data: dorm,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.retrieveDorm();
    });
  }
}
