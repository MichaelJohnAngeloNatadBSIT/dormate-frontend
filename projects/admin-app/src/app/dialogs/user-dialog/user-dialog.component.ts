import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'projects/admin-app/services/admin.service';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent implements OnInit {
  public showPassword: boolean = false;
  form: any;
  verifyUserForm: any;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      first_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      mobile_number: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
      ]),
    });

    this.verifyUserForm = this.fb.group({
      verified: ['true']
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    var message = '';
    const formData = this.form.getRawValue();

    this.adminService.updateUser(this.data._id, formData).subscribe({
      next: (res) => {
        message = res.message
          ? res.message
          : 'This user was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  verifyUser(): void {
    var message = '';
    const updateData = this.verifyUserForm.getRawValue();

    this.adminService.updateUser(this.data._id, updateData).subscribe({
      next: (res) => {
        message = res.message
          ? res.message
          : 'This user was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  userDeleteDialog(user_id:any){
    let dialogRef = this.dialog.open(DeleteUserDialogComponent, { 
      data: user_id
    }); 

  }


}
