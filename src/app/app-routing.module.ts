import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DormsListComponent } from './components/dorms-list/dorms-list.component';
import { DormDetailsComponent } from './components/dorm-details/dorm-details.component';
import { AddDormComponent } from './components/add-dorm/add-dorm.component';
import { RegisterComponent } from './components/login-registration/register/register.component';
import { LoginComponent } from './components/login-registration/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardLandlordComponent } from './components/board-landlord/board-landlord.component';
import { AuthGuard } from './services/auth.guard';
import { InfoScheduleDialogComponent } from './dialogs/info-schedule-dialog/info-schedule-dialog.component';
import { VisitProfileComponent } from './components/visit-profile/visit-profile.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DormComponent } from './components/dorm/dorm.component';
import { DormDetailsLandlordComponent } from './components/dorm-details-landlord/dorm-details-landlord.component';
import { DormDetailsTenantComponent } from './components/dorm-details-tenant/dorm-details-tenant.component';


const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full'},
  { path: 'dorms', component: DormsListComponent },
  { path: 'dorms/:id', component: DormDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddDormComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'info-schedule', component: InfoScheduleDialogComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'visit-profile', component: VisitProfileComponent, canActivate: [AuthGuard] },
  { path: 'user', component: BoardUserComponent },
  { path: 'landlord', component: BoardLandlordComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'dorm-detail/:id', component: DormComponent, canActivate: [AuthGuard] },
  { path: 'dorm-detail-landlord/:id', component: DormDetailsLandlordComponent, canActivate: [AuthGuard] },
  { path: 'dorm-detail-tenant/:id', component: DormDetailsTenantComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
