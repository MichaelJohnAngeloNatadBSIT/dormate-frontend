import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'projects/admin-app/helpers/auth.interceptor.interceptor';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './component/sidebar/sidebar.component';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UsersComponent } from './component/users/users.component';
import { DormsComponent } from './component/dorms/dorms.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { DormDialogComponent } from './dialogs/dorm-dialog/dorm-dialog.component';
import { DeleteUserDialogComponent } from './dialogs/delete-user-dialog/delete-user-dialog.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { DeleteDormDialogComponent } from './dialogs/delete-dorm-dialog/delete-dorm-dialog.component';
import { EventDialogComponent } from './dialogs/event-dialog/event-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { EventInterceptor } from './interceptors/event.interceptor';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    DashboardComponent,
    UsersComponent,
    DormsComponent,
    UserDialogComponent,
    DormDialogComponent,
    DeleteUserDialogComponent,
    DeleteDormDialogComponent,
    EventDialogComponent,
    ErrorDialogComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxUsefulSwiperModule,

  ],
  providers: [
    AuthInterceptor,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: EventInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

