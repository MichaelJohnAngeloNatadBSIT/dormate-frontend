import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DormService } from 'src/app/services/dorm.service';



@Component({
  selector: 'app-delete-dorm-dialog',
  templateUrl: './delete-dorm-dialog.component.html',
  styleUrls: ['./delete-dorm-dialog.component.css']
})
export class DeleteDormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDormDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dormService: DormService,
    private router: Router
  ){}

  deleteDorm(): void {
    console.log(this.data);
    this.dormService.delete(this.data._id).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['profile']);
        });
      },
      error: (e) => console.error(e)
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
