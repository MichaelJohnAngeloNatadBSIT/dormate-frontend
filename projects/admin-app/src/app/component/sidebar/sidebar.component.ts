import { Component, OnInit } from '@angular/core';
import { StorageService } from 'projects/admin-app/services/storage.service';
import { AuthService } from 'projects/admin-app/services/auth.service';
import { Admin } from 'projects/admin-app/interface/admin';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  admin: Admin
  isUserLoggedIn: boolean;
  status = false;

  constructor(
    private storageService: StorageService, 
    private authService: AuthService
    ) { 
    this.authService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.admin = this.storageService.getUser();
      // this.roles = this.admin.roles;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = this.admin.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addToggle(){
    this.status = !this.status;       
  }

}
