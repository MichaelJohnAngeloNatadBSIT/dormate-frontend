import { Component } from '@angular/core';
import { Admin } from 'projects/admin-app/interface/admin';
import { AdminService } from 'projects/admin-app/services/admin.service';
import { StorageService } from 'projects/admin-app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  admin: Admin;
  isUserLoggedIn: boolean;
  isLoggedIn = false;
  username;
  dorm_count: any;
  dorm_count_approved: any;
  user_count: any;

  constructor(
    private storageService: StorageService, 
    private adminService : AdminService,
  ){}

  async ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.admin = this.storageService.getUser();
      this.username = this.admin.username;
    }
    this.retrieveDormCount();
    this.retrieveUserCount();
    this.retrieveApprovedDormCount()
  }

  retrieveDormCount(){
    this.adminService.getCountDorm().subscribe({
      next: (data) => {
        this.dorm_count = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveApprovedDormCount(){
    this.adminService.getCountDormApproved().subscribe({
      next: (data) => {
        this.dorm_count_approved = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveUserCount(){
    this.adminService.getCountUser().subscribe({
      next: (data) => {
        this.user_count = data;
      },
      error: (e) => console.error(e)
    });
  }

}
