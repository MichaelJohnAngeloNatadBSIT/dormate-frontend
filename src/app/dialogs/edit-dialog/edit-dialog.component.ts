import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  public showPassword: boolean = false;
  form: any ;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService : UserService,
  ){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl({value:'', disabled: true}, [Validators.required, Validators.email]),
      username: new FormControl({value:'', disabled: true}, [Validators.required, Validators.maxLength(15)]),
      first_name: new FormControl({value:'', disabled: true}, [Validators.required, Validators.maxLength(60)]),
      last_name: new FormControl({value:'', disabled: true}, [Validators.required, Validators.maxLength(60)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      mobile_number: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    });

  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }

  updateUser(): void {
    var message = '';
    const formData = this.form.getRawValue();

    this.userService.updateUser(this.data.id, formData)
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
