import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valid-id-dialog',
  templateUrl: './valid-id-dialog.component.html',
  styleUrls: ['./valid-id-dialog.component.css']
})
export class ValidIdDialogComponent implements OnInit  {
  
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  user: User;
  preview = "";


  fileInfos?: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<ValidIdDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.fileInfos = this.userService.getFiles();
  }


  selectFile(event: any): void {

    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
         
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  
  upload(): void {
    // this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.userService.uploadValidId(this.data.id, this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              // this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.userService.getFiles();
              this.router.navigate(['/profile'])
                .then(()=> {
              });
            }
          },
          (err: any) => {
            console.log(err);
            // this.progress = 0;
  
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
  }

  onCancel(): void { 
    this.dialogRef.close(); 
  } 

}
