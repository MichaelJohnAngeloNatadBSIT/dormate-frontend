import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDormComponent } from './components/add-dorm/add-dorm.component';
import { DormDetailsComponent } from './components/dorm-details/dorm-details.component';
import { DormsListComponent } from './components/dorms-list/dorms-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login-registration/login/login.component';
import { RegisterComponent } from './components/login-registration/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardLandlordComponent } from './components/board-landlord/board-landlord.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorComponent } from './error/error-component/error-component.component';
import { ErrorInterceptor } from './error/error-interceptor.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './helpers/loading.interceptor';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { UserImageDialogComponent } from './dialogs/user-image-dialog/user-image-dialog.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { CertificateUploadDialogComponent } from './dialogs/certificate-upload-dialog/certificate-upload-dialog.component';
import { DormImagesUploadDialogComponent } from './dialogs/dorm-images-upload-dialog/dorm-images-upload-dialog.component';
import { EditDormInfoDialogComponent } from './dialogs/edit-dorm-info-dialog/edit-dorm-info-dialog.component';
import { DeleteDormDialogComponent } from './dialogs/delete-dorm-dialog/delete-dorm-dialog.component';
import { EventDialogComponent } from './event/event-dialog/event-dialog.component';
import { EventInterceptor} from './event/event-interceptor.interceptor';
import { MatTableModule } from '@angular/material/table';
import { ChangePasswordComponent } from './dialogs/change-password/change-password.component';
import { InfoScheduleDialogComponent } from './dialogs/info-schedule-dialog/info-schedule-dialog.component';
import { ChatService } from './services/chat.service';
import { ScheduleApproveComponent } from './dialogs/schedule-approve/schedule-approve.component';
import { ImageZoomComponent } from './dialogs/image-zoom/image-zoom.component';
import { ScheduleApproveTenantComponent } from './dialogs/schedule-approve-tenant/schedule-approve-tenant.component';
import { ValidIdDialogComponent } from './dialogs/valid-id-dialog/valid-id-dialog.component';
import { VisitProfileComponent } from './components/visit-profile/visit-profile.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ViewCertificatesComponent } from './dialogs/view-certificates/view-certificates.component';
import { PublishDialogComponent } from './dialogs/publish-dialog/publish-dialog.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DormComponent } from './components/dorm/dorm.component';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { RoundTimeTo30MinsDirectiveDirective } from './directives/round-time-to30-mins-directive.directive';
import { TimePickerComponentComponent } from './components/time-picker-component/time-picker-component.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PaymentDialogComponent } from './dialogs/payment-dialog/payment-dialog.component';
import { DormDetailsLandlordComponent } from './components/dorm-details-landlord/dorm-details-landlord.component';
import { AcceptAsTenantDialogComponent } from './dialogs/accept-as-tenant-dialog/accept-as-tenant-dialog.component';
import { EvictAsTenantDialogComponent } from './dialogs/evict-as-tenant-dialog/evict-as-tenant-dialog.component';
import { TenantVisitorInfoDialogComponent } from './dialogs/tenant-visitor-info-dialog/tenant-visitor-info-dialog.component';
import { RejectAsTenantDialogComponent } from './dialogs/reject-as-tenant-dialog/reject-as-tenant-dialog.component';
import { ScheduleRejectComponent } from './dialogs/schedule-reject/schedule-reject.component';
import { DormDetailsTenantComponent } from './components/dorm-details-tenant/dorm-details-tenant.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { AddFriendListComponent } from './components/add-friend-list/add-friend-list.component';
import { FriendRequestListComponent } from './components/friend-request-list/friend-request-list.component';
import { ReferFriendListComponent } from './components/refer-friend-list/refer-friend-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AddDormComponent,
    DormDetailsComponent,
    DormsListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardLandlordComponent,
    BoardUserComponent,
    ErrorComponent,
    SpinnerComponent,
    EditDialogComponent,
    UserImageDialogComponent,
    CertificateUploadDialogComponent,
    DormImagesUploadDialogComponent,
    EditDormInfoDialogComponent,
    DeleteDormDialogComponent,
    EventDialogComponent,
    ChangePasswordComponent,
    InfoScheduleDialogComponent,
    ScheduleApproveComponent,
    ImageZoomComponent,
    ScheduleApproveTenantComponent,
    ValidIdDialogComponent,
    VisitProfileComponent,
    AboutUsComponent,
    ViewCertificatesComponent,
    PublishDialogComponent,
    LandingPageComponent,
    DormComponent,
    RoundTimeTo30MinsDirectiveDirective,
    TimePickerComponentComponent,
    PaymentDialogComponent,
    DormDetailsLandlordComponent,
    AcceptAsTenantDialogComponent,
    EvictAsTenantDialogComponent,
    TenantVisitorInfoDialogComponent,
    RejectAsTenantDialogComponent,
    ScheduleRejectComponent,
    DormDetailsTenantComponent,
    StarRatingComponent,
    AddFriendListComponent,
    FriendRequestListComponent,
    ReferFriendListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxUsefulSwiperModule,
    MatTableModule,
    GoogleMapsModule,
    ToastrModule.forRoot({
      preventDuplicates: false,
      progressBar: true,
      countDuplicates: true,
      extendedTimeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
    FullCalendarModule,
    PdfViewerModule,
    NgbModule
  ],
  providers: [
              authInterceptorProviders, 
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: EventInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
              ChatService
            ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, EventDialogComponent]
})
export class AppModule { }
