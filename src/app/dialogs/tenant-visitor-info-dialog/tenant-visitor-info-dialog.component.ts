import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { Referral } from 'src/app/interface/referral';


@Component({
  selector: 'app-tenant-visitor-info-dialog',
  templateUrl: './tenant-visitor-info-dialog.component.html',
  styleUrls: ['./tenant-visitor-info-dialog.component.css']
})
export class TenantVisitorInfoDialogComponent implements OnInit{
  user: User;
  userReferrals: Referral[];

  constructor(
    public dialogRef: MatDialogRef<TenantVisitorInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
  ){

  }
  ngOnInit(): void {
    this.retrieveUser();
  }

  retrieveUser(){
    this.userService.retrieveUserWithId(this.data.user_id).subscribe((resp) =>{
      this.user = resp;
      console.log(this.user.referral);
      this.userReferrals = this.user.referral;
      console.log(this.userReferrals);
    });
  }
}
