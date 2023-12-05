import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-certificates',
  templateUrl: './view-certificates.component.html',
  styleUrls: ['./view-certificates.component.css']
})
export class ViewCertificatesComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewCertificatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

}
