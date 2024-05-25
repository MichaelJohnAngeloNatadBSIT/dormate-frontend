import { Component } from '@angular/core';
import { ResponsiveService } from './responsive/responsive.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { User } from './interface/user';
import { VisitService } from './services/visit.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content?: string;
  title = 'dormate-app';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showLandlordBoard = false;
  username?: string;
  dataRefresher: any;

  public isMobileLayout = false;

  // currentUser: User;
  user : User;
  isUserLoggedIn: boolean;
  visitCount: number = 0;

  constructor(
    public responsiveService:ResponsiveService, 
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    public router: Router,
    private visitService: VisitService,
    ) {
      this.authService.isUserLoggedIn.subscribe( value => {
        this.isUserLoggedIn = value;
    });

  }

  ngOnInit(): void {
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;

    this.isLoggedIn = this.tokenStorageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showLandlordBoard = this.roles.includes('ROLE_LANDLORD');

      this.username = user.username;

      this.authService.isUserLoggedIn.next(true);
    }

    this.getVisitCount();
    this.incrementVisitCount();
  }


  
  getVisitCount() {
    this.visitService.getVisitCount().subscribe(data => {
      this.visitCount = data.count;
    });
  }

  incrementVisitCount() {
    this.visitService.incrementVisitCount().subscribe(data => {
      this.visitCount = data.count;
    });
  }

  logout(): void {
    this.tokenStorageService.clean();
    
    this.authService.logout().subscribe({
      next: res => {
        window.location.reload();
        this.router.navigate(["/dorms"]);
      },
      error: err => {
        console.log(err);
      }
    });
  }



}
