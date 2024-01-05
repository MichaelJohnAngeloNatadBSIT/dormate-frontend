import { Component, Inject } from '@angular/core';
import { DormService } from 'src/app/services/dorm.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-dialog',
  templateUrl: './publish-dialog.component.html',
  styleUrls: ['./publish-dialog.component.css']
})
export class PublishDialogComponent {

  publishForm: FormGroup;
  unPublishForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PublishDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dormService : DormService,
    private fb : FormBuilder,
    private router: Router
  ){
    
    this.publishForm = this.fb.group({
      publish: ['true']
    })

    this.unPublishForm = this.fb.group({
      publish: ['false']
    })

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  publishDorm(): void{
    const updateData = this.publishForm.getRawValue();
    
    this.dormService.update(this.data._id, updateData)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['profile']);
          });
        },
        error: (e) => console.error(e)
      });
  }

  unPublishDorm(): void{
    const updateData = this.unPublishForm.getRawValue();
    
    this.dormService.update(this.data._id, updateData)
      .subscribe({
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
