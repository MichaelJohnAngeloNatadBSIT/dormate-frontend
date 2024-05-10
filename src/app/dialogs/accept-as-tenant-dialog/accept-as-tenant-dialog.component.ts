import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedules.model';

@Component({
  selector: 'app-accept-as-tenant-dialog',
  templateUrl: './accept-as-tenant-dialog.component.html',
  styleUrls: ['./accept-as-tenant-dialog.component.css']
})
export class AcceptAsTenantDialogComponent implements OnInit {

  scheduleData: Schedule;
  constructor(
    public dialogRef: MatDialogRef<AcceptAsTenantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit(): void {
      console.log(this.data);
      this.scheduleData = this.data;
  }
}
