import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedules.model';
import { DormService } from 'src/app/services/dorm.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accept-as-tenant-dialog',
  templateUrl: './accept-as-tenant-dialog.component.html',
  styleUrls: ['./accept-as-tenant-dialog.component.css']
})
export class AcceptAsTenantDialogComponent implements OnInit {

  scheduleData: Schedule;
  // user: User;
  tenant: any[];
  tenant_accepted: any;
  user_updated_data: any;

  constructor(
    public dialogRef: MatDialogRef<AcceptAsTenantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dormService: DormService,
    private scheduleService: ScheduleService,
    private userService: UserService,
  ){}

  ngOnInit(): void {
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
    const currentTimestamp = Date.now();
    this.dormService.addTenant(this.data.dorm_id, this.tenant).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });

    this.tenant_accepted = {
      is_accepted_tenant : true
    };

    this.scheduleService.updateScheduleOnly(this.data._id, this.tenant_accepted).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });
    
    this.user_updated_data = {
      dorm_id: this.data.dorm_id,
      dorm_title: this.data.dorm_title,
      dorm_landlord_user_id: this.data.landlord_id,
      is_tenant: true,
      dorm_tenant_date: currentTimestamp 
    };

    console.log(currentTimestamp);

    this.userService.updateUser(this.data.tenant_user_id, this.user_updated_data).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
