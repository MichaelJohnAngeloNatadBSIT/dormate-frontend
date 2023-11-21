import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user';
import { DormService } from 'src/app/services/dorm.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-dorm-images-upload-dialog',
  templateUrl: './dorm-images-upload-dialog.component.html',
  styleUrls: ['./dorm-images-upload-dialog.component.css']
})
export class DormImagesUploadDialogComponent {
  selectedFiles?: FileList;
  previews = [];
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  currentUser: User;
  currentFile?: File;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<DormImagesUploadDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dormService: DormService
  ){
  
  }

  //file event listener
  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
  
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

//upload function for multiple files
  uploadFiles(): void {
    this.upload(this.selectedFiles);
  }

  //upload dorm images function
  upload(file: FileList): void {
    this.progress = 0;
  
      if (file) {
        this.dormService.addDormImages(this.data._id, file).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
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

}
