import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})
export class ErrorComponent implements OnInit{
  // message = "An Unknown Error Occurred!" 
  constructor (
    @Inject(MAT_DIALOG_DATA) public data:{message: string},
    public dialogRef: MatDialogRef<ErrorComponent>
    ){}

    onOkClick(): void {
      this.dialogRef.close(true);
    }

    ngOnInit() {
      this.dialogRef.disableClose = true;
    }
}
