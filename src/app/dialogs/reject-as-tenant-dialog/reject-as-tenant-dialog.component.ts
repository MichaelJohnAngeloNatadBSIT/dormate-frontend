import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedules.model';
import { DormService } from 'src/app/services/dorm.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reject-as-tenant-dialog',
  templateUrl: './reject-as-tenant-dialog.component.html',
  styleUrls: ['./reject-as-tenant-dialog.component.css']
})
export class RejectAsTenantDialogComponent implements OnInit {

  scheduleData: Schedule;
  tenant_rejected: any;

  constructor(
    public dialogRef: MatDialogRef<RejectAsTenantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private scheduleService: ScheduleService,
  ){}

  ngOnInit(): void {
    this.scheduleData = this.data;
  }
  
  rejectAsTenant(){
    this.tenant_rejected = {
      is_accepted_tenant : false
    };

    this.scheduleService.updateScheduleOnly(this.data._id, this.tenant_rejected).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
