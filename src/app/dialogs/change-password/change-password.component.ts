import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from 'src/app/angular-material/validator/confirm-password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  
  public showPassword: boolean = false;
  form: any ;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService : UserService,
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      confirm_password:  new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    },
    { validators: ConfirmPasswordValidator("new_password", "confirm_password") });
  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }

  changePassword(): void {
    var message = '';
    const formData = this.form.getRawValue();

    this.userService.changePassword(this.data.id, formData)
      .subscribe({
        next: (res) => {
          message = res.message ? res.message : 'This user was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
    }

}
