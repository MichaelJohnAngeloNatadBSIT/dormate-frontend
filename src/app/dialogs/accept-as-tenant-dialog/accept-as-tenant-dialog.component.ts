import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedules.model';
import { DormService } from 'src/app/services/dorm.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-accept-as-tenant-dialog',
  templateUrl: './accept-as-tenant-dialog.component.html',
  styleUrls: ['./accept-as-tenant-dialog.component.css']
})
export class AcceptAsTenantDialogComponent implements OnInit {

  scheduleData: Schedule;
  tenant: any[];
  tenant_accepted: any;

  constructor(
    public dialogRef: MatDialogRef<AcceptAsTenantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dormService: DormService,
    private scheduleService: ScheduleService,
  ){}

  ngOnInit(): void {
    console.log(this.data);
    this.scheduleData = this.data;
    // Assuming tenantData is an array
    this.tenant = [{
        tenant_user_id: this.scheduleData.tenant_user_id,
        tenant_username: this.scheduleData.tenant_username,
        tenant_full_name: this.scheduleData.tenant_full_name,
        tenant_contact_number: this.scheduleData.tenant_contact_number,
        tenant_address: this.scheduleData.tenant_address,
        approve_tenant: true
      }];
  }
  
  acceptAsTenant(){
    this.dormService.addTenant(this.data.dorm_id, this.tenant).subscribe((data) => {
    });

    this.tenant_accepted = {
      is_accepted_tenant : true
    };

    this.scheduleService.updateScheduleOnly(this.data._id, this.tenant_accepted).subscribe((data) => {
      console.log(data);
    });
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
