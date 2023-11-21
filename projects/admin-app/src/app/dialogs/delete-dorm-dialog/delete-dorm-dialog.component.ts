import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'projects/admin-app/services/admin.service';

@Component({
  selector: 'app-delete-dorm-dialog',
  templateUrl: './delete-dorm-dialog.component.html',
  styleUrls: ['./delete-dorm-dialog.component.css']
})
export class DeleteDormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService
  ){}

  deleteDormPost(): void{
    this.adminService.deleteDorm(this.data).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
