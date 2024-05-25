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
import { ScheduleApproveComponent } from 'src/app/dialogs/schedule-approve/schedule-approve.component';
import { AcceptAsTenantDialogComponent } from 'src/app/dialogs/accept-as-tenant-dialog/accept-as-tenant-dialog.component';
import { EvictAsTenantDialogComponent } from 'src/app/dialogs/evict-as-tenant-dialog/evict-as-tenant-dialog.component';
import { TenantVisitorInfoDialogComponent } from 'src/app/dialogs/tenant-visitor-info-dialog/tenant-visitor-info-dialog.component';
import { RejectAsTenantDialogComponent } from 'src/app/dialogs/reject-as-tenant-dialog/reject-as-tenant-dialog.component';
import { ScheduleRejectComponent } from 'src/app/dialogs/schedule-reject/schedule-reject.component';
import { Tenant } from 'src/app/interface/tenant';
import { Review } from 'src/app/interface/review';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-dorm-details-landlord',
  templateUrl: './dorm-details-landlord.component.html',
  styleUrls: ['./dorm-details-landlord.component.css'],
})


export class DormDetailsLandlordComponent implements OnInit {
  dorm_id: string;
  dorm: Dorm;
  dormTemp: Dorm;
  currentUser: User;
  user : User;
  dorms?: Dorm[];
  tenants?: Tenant[];
  tenantSchedule: Schedule[];
  schedulesLandlord?: Schedule[];
  schedulesLandlordApproved?: Schedule[];
  schedulesTenant?: Schedule[];
  schedulesApproved?: Schedule[];
  calendar_events : EventInput[] = [];
  reviews : Review[];
  userInfo : any;
  checkOutUrl: any;
  dormResp: any;
  payment_status: any;

  constructor(
    private tokenService: TokenStorageService,
    private userService: UserService,
    private dialog: MatDialog,
    private dormService: DormService,
    private scheduleService: ScheduleService,
    private router: Router,
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.dorm_id = this.route.snapshot.paramMap.get('id');

    this.dormService.getDormById(this.dorm_id).subscribe({
      next: (data) => {
        this.dorm = data;

        this.userInfo = {
          user_id: this.dorm.user_id,
          dorm_id: this.dorm._id
        };
    
        this.paymentService.createPayment(this.userInfo).subscribe((resp) => {
          this.dormResp = resp;
          this.dormTemp = this.dormResp.data;
          this.checkOutUrl = this.dormTemp.payment_checkout_url;
          this.payment_status = this.dormTemp.payment_status;
        }, (error) => {
          console.error("Error occurred while creating payment:", error);
          // Handle error or inform the user accordingly
        });
        
      },
      error: (e) => console.error(e),
    });

    this.currentUser = this.tokenService.getUser();

      this.currentUser = this.tokenService.getUser();
      // this.retrieveUser();
      this.retrieveDorm();
      this.retrieveForApprovalScheduleLandlord();
      this.retrieveForApprovedScheduleLandlord();
  }
  
  retrieveDorm(): void {
    this.dormService.getDormById(this.dorm_id)
      .subscribe({
        next: (data) => {
          this.dorm = data;
          this.tenants = this.dorm.tenants;
          this.reviews = this.dorm.tenantReviews;
        },
        error: (e) => console.error(e)
      });
  }

  retrieveForApprovalScheduleLandlord(): void {
    this.scheduleService.getAllScheduleLandlord(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.schedulesLandlord = data;
        },
        error: (e) => console.error(e)
      });
  }

  retrieveForApprovedScheduleLandlord(): void {
    this.scheduleService.getAllScheduleLandlordApproved(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.schedulesLandlordApproved = data;
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

  openScheduleApproveDialog(schedule: Schedule): void{
    let dialogRef = this.dialog.open(ScheduleApproveComponent, { 
      width: '500px', 
      height: '80vh',
      data: schedule
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalScheduleLandlord();
      this.retrieveForApprovedScheduleLandlord();
     }); 
  }

  openScheduleRejectDialog(schedule: Schedule): void{
    let dialogRef = this.dialog.open(ScheduleRejectComponent, { 
      width: '500px', 
      height: '80vh',
      data: schedule
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalScheduleLandlord();
      this.retrieveForApprovedScheduleLandlord();
     }); 
  }

  openAcceptTenantDialog(schedule: Schedule): void{
    let dialogRef = this.dialog.open(AcceptAsTenantDialogComponent, { 
      width: '400px', 
      height: '50vh',
      data: schedule
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalScheduleLandlord();
      this.retrieveForApprovedScheduleLandlord();
      this.retrieveDorm();
     }); 
  }

  openRejectTenantDialog(schedule: Schedule): void{
    let dialogRef = this.dialog.open(RejectAsTenantDialogComponent, { 
      width: '400px', 
      height: '50vh',
      data: schedule
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalScheduleLandlord();
      this.retrieveForApprovedScheduleLandlord();
      this.retrieveDorm();
     }); 
  }

  openEvictTenantDialog(tenant: Tenant, dorm: Dorm): void{
    let dialogRef = this.dialog.open(EvictAsTenantDialogComponent, { 
      width: '400px', 
      height: '50vh',
      data: { tenant, dorm }
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalScheduleLandlord();
      this.retrieveForApprovedScheduleLandlord();
      this.retrieveDorm();
     }); 
  }

  openTenantVisitorDialog(user_id: any): void{
    let dialogRef = this.dialog.open(TenantVisitorInfoDialogComponent, { 
      width: '500px', 
      height: '70vh',
      data: user_id
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveForApprovalScheduleLandlord();
      this.retrieveForApprovedScheduleLandlord();
      this.retrieveDorm();
     }); 
  }
}
