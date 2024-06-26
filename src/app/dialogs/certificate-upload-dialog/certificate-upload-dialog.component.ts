import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DormService } from 'src/app/services/dorm.service';
import { Dorm } from 'src/app/models/dorms.model';

@Component({
  selector: 'app-certificate-upload-dialog',
  templateUrl: './certificate-upload-dialog.component.html',
  styleUrls: ['./certificate-upload-dialog.component.css'],
})
export class CertificateUploadDialogComponent {
  selectedFiles?: FileList;
  // previewBusinessPermit = '';
  // previewBarangayClearance = '';
  // previewBfpPermit = '';
  // previewSanitaryPermit = '';

  // Assuming this is part of your component class

  // Define variables to hold file preview data
  previewBusinessPermit: any;
  previewBusinessPermitType: string;
  businessPermitPDF;

  previewBarangayClearance: any;
  previewBarangayClearanceType: string;
  barangayClearancePDF;

  previewBfpPermit: any;
  previewBfpPermitType: string;
  bfpPermitPDF;

  previewSanitaryPermit: any;
  previewSanitaryPermitClearanceType: string;
  sanitaryPermitPDF;


  businessPermitFileType;
  // previewMayorPermit = '';
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  currentFile?: File;
  dorms: Dorm[];

  constructor(
    public dialogRef: MatDialogRef<CertificateUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dormService: DormService
  ) {}

  // Function to get file type from file name
  getFileType(fileName: string): string {
    const fileType = fileName.split('.').pop(); // Get the extension
    return fileType.toLowerCase(); // Return lowercase file extension
  }

   // Method to check if the file is an image (supports jpg, jpeg, png)
   isImageFile(filename: string): boolean {
    const extension = this.getFileExtension(filename);
    return extension === 'jpg' || extension === 'jpeg' || extension === 'png';
  }

  // Method to check if the file is a PDF
  isPDFFile(filename: string): boolean {
    const extension = this.getFileExtension(filename);
    return extension === 'pdf';
  }

  // Helper method to extract file extension
  private getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  // Your selectFileBusinessPermit function
  selectFileBusinessPermit(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previewBusinessPermit = e.target.result;
          // Determine file type
          this.previewBusinessPermitType = this.getFileType(
            this.selectedFiles[i].name
          );
          this.businessPermitPDF = this.selectedFiles[i].name;
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  selectFileBarangayClearance(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previewBarangayClearance = e.target.result;
          // Determine file type
          this.previewBarangayClearanceType = this.getFileType(
            this.selectedFiles[i].name
          );
          this.barangayClearancePDF = this.selectedFiles[i].name;
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  selectFileBfpPermit(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previewBfpPermit = e.target.result;
          // Determine file type
          this.previewBfpPermitType = this.getFileType(
            this.selectedFiles[i].name
          );
          this.bfpPermitPDF = this.selectedFiles[i].name;
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  // selectFileMayorPermit(event: any): void {
  //   // this.message = [];
  //   // this.progressInfos = [];
  //   this.selectedFiles = event.target.files;

  //   // this.preview =;
  //   if (this.selectedFiles && this.selectedFiles[0]) {
  //     const numberOfFiles = this.selectedFiles.length;
  //     for (let i = 0; i < numberOfFiles; i++) {
  //       const reader = new FileReader();

  //       reader.onload = (e: any) => {
  //         this.previewMayorPermit = e.target.result;
  //         // this.previews.push(e.target.result);
  //       };

  //       reader.readAsDataURL(this.selectedFiles[i]);
  //     }
  //   }
  // }

  selectFileSanitaryPermit(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previewSanitaryPermit = e.target.result;
          // Determine file type
          this.previewSanitaryPermitClearanceType = this.getFileType(
            this.selectedFiles[i].name
          );
          this.sanitaryPermitPDF = this.selectedFiles[i].name;
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadBusinessRegImage(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.dormService
          .addBusinessRegImage(this.data._id, this.currentFile)
          .subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
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
            }
          );
      }
      this.selectedFiles = undefined;
    }
  }

  uploadBarangayCertImage(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.dormService
          .addBarangayClearanceImage(this.data._id, this.currentFile)
          .subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
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
            }
          );
      }

      this.selectedFiles = undefined;
    }
  }

  uploadBfpCertImage(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.dormService
          .addBfpCertImage(this.data._id, this.currentFile)
          .subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
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
            }
          );
      }

      this.selectedFiles = undefined;
    }
  }

  // uploadMayorPermitImage(): void {
  //   this.progress = 0;

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);

  //     if (file) {
  //       this.currentFile = file;

  //       this.dormService
  //         .addMayorPermitImage(this.data._id, this.currentFile)
  //         .subscribe(
  //           (event: any) => {
  //             if (event.type === HttpEventType.UploadProgress) {
  //               this.progress = Math.round((100 * event.loaded) / event.total);
  //             } else if (event instanceof HttpResponse) {
  //               this.message = event.body.message;
  //               // this.router.navigate(['/cert-upload'])
  //               //   .then(()=> {
  //               //   window.location.reload();
  //               // });
  //             }
  //           },
  //           (err: any) => {
  //             console.log(err);
  //             this.progress = 0;

  //             if (err.error && err.error.message) {
  //               this.message = err.error.message;
  //             } else {
  //               this.message = 'Could not upload the file!';
  //             }

  //             this.currentFile = undefined;
  //           }
  //         );
  //     }

  //     this.selectedFiles = undefined;
  //   }
  // }

  uploadSanitaryPermitImage(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.dormService
          .addSanitaryPermitImage(this.data._id, this.currentFile)
          .subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
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
            }
          );
      }

      this.selectedFiles = undefined;
    }
  }
}
