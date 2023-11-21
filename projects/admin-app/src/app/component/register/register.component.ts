import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/admin-app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Roles: any = ['Admin', 'Landlord', 'User'];
  public showPassword: boolean = false;

  form: any = {
    username: null,
    first_name: null,
    last_name: null,
    // address: null,
    email: null,
    password: null,
    mobile_number: null
    // confirmPassword: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(
    private authService: AuthService, 
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      first_name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      last_name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      // address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      mobile_number: new FormControl('', [Validators.required, Validators.maxLength(12)]),

      //confirmPassword: new FormControl('', Validators.required),
      
    })
  }

  onSubmit() {
    const formData = this.form.getRawValue();

    if(this.form.invalid){
      return;
    }else{
      this.authService.register(formData).subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      
      });

    }
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
    }

}
