import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'projects/admin-app/services/admin.service';
import { User } from 'src/app/interface/user';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
  ){

  }

  ngOnInit(): void {
    this.retrieveUsers()
  }

  retrieveUsers(){
    this.adminService.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (e) => console.error(e)
    });
  }

  openUserDialog(user: User): void {
    let dialogRef = this.dialog.open(UserDialogComponent, { 
      width: '700px', 
      height: '80vh',
      data: user
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveUsers()
     }); 
  }

}
