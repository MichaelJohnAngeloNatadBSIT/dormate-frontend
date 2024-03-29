import { Component, OnInit  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
              private tokenStorage: TokenStorageService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    if (this.tokenStorage.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
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
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        this.router.navigate(['/dorms']);
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

  registerPage(){
    this.router.navigate(['/register']);
  }

  
}
