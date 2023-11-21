import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'projects/admin-app/services/admin.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService
  ){}
  
  deleteUser(){
    this.adminService.deleteUser(this.data).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });;

  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
