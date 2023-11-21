import { Component, Input, Inject } from '@angular/core';
import { Dorm } from 'src/app/models/dorms.model';
import { AdminService } from 'projects/admin-app/services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SwiperOptions } from 'swiper';
import { DeleteDormDialogComponent } from '../delete-dorm-dialog/delete-dorm-dialog.component';

@Component({
  selector: 'app-dorm-dialog',
  templateUrl: './dorm-dialog.component.html',
  styleUrls: ['./dorm-dialog.component.css']
})
export class DormDialogComponent {
  dormForm: FormGroup;
  publishForm: FormGroup;
  unPublishForm: FormGroup;
  dorm: Dorm;
  
  constructor(
    public dialogRef: MatDialogRef<DormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private fb : FormBuilder,
    private dialog: MatDialog
  ){
    this.createForm();
  }

  createForm() {
    this.dormForm = this.fb.group({
       title: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(5)]],
       description: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
       address: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
       bedroom: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1)]],
       bathroom: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1)]],
       rent: ['', [Validators.required, Validators.maxLength(100000), Validators.minLength(100)]],
       lessor: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(5)]],
    });

    this.publishForm = this.fb.group({
      publish: ['true']
    })

    this.unPublishForm = this.fb.group({
      publish: ['false']
    })

  }
  config: SwiperOptions = {
    pagination: { 
      el: '.swiper-pagination', 
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  getDorm(): void {
    this.adminService.getDormById(this.data)
      .subscribe({
        next: (data) => {
          this.dorm = data;
        },
        error: (e) => console.error(e)
      });
  }

  updateDorm(): void {
    const updateData = this.dormForm.getRawValue();
    this.adminService.updateDormInfo(this.data._id, updateData)
      .subscribe({
        next: (res) => {
          
        },
        error: (e) => console.error(e)
      });
  }

  publishDorm(): void{
    const updateData = this.publishForm.getRawValue();
    
    this.adminService.updateDormInfo(this.data._id, updateData)
      .subscribe({
        next: (res) => {

        },
        error: (e) => console.error(e)
      });
  }

  unPublishDorm(): void{
    const updateData = this.unPublishForm.getRawValue();
    
    this.adminService.updateDormInfo(this.data._id, updateData)
      .subscribe({
        next: (res) => {
        },
        error: (e) => console.error(e)
      });
  }

  dormDeleteDialog(dorm_id: any){
    let dialogRef = this.dialog.open(DeleteDormDialogComponent, { 
      data: dorm_id
    }); 
    // dialogRef.afterClosed().subscribe(result => { 
    //   window.location.reload();
    //  }); 

  }

}
