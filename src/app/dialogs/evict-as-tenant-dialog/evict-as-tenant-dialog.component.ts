import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { UserService } from 'src/app/services/user.service';

interface Tenant {
  tenant_username?: string;
  tenant_user_id?: string;
  tenant_full_name?: string;
  tenant_contact_number?: string;
  tenant_address?: string;
  verified?: boolean;
  approve_tenant?: boolean;
}

@Component({
  selector: 'app-evict-as-tenant-dialog',
  templateUrl: './evict-as-tenant-dialog.component.html',
  styleUrls: ['./evict-as-tenant-dialog.component.css']
})
export class EvictAsTenantDialogComponent implements OnInit {

  tenant: Tenant;
  tenant_user_id: any;
  user_evict_data: any;
  
  constructor(
    public dialogRef: MatDialogRef<EvictAsTenantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dormService: DormService,
    private userService: UserService,
  ){

  }

  ngOnInit(): void {
    this.tenant = this.data.tenant;
    console.log(this.data);
  }
  
  evictAsTenant(){
    this.dormService.evictTenant(this.data.dorm._id, this.data.tenant.tenant_user_id).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });

    this.user_evict_data = {
      dorm_id: "",
      dorm_title: "",
      dorm_landlord_user_id: "",
      is_tenant: false,
      approve_tenant: true,
      dorm_tenant_date: "" 
      
    };

    this.userService.updateUser(this.data.tenant.tenant_user_id, this.user_evict_data).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
