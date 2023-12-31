import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
  // message = "An Unknown Error Occurred!" 
  constructor (
    @Inject(MAT_DIALOG_DATA) public data:{message: string},
    public dialogRef: MatDialogRef<ErrorDialogComponent>
    ){}

    onOkClick(): void {
      this.dialogRef.close(true);
    }

    ngOnInit() {
      this.dialogRef.disableClose = true;
    }

}
