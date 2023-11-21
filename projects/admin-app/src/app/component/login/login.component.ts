import { Component, OnInit  } from '@angular/core';
import { AuthService } from 'projects/admin-app/services/auth.service';
import { StorageService } from 'projects/admin-app/services/storage.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  public showPassword: boolean = false;


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isSuccessful = false;
  isSignUpFailed = false;

  constructor(private authService: AuthService, 
              private storageService: StorageService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }

    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required) 
    })
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        
        this.router.navigate(['/dashboard-nav']);
        this.authService.isUserLoggedIn.next(true);
     
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public formError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
    }
}
