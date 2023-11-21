import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( 
    private authService: AuthService, 
    private router: Router,
    private tokenService: TokenStorageService
    ) { } 
canActivate( 
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Promise<boolean> { 
    var isAuthenticated = this.tokenService.isLoggedIn(); 
    if (!isAuthenticated) { 
        this.router.navigate(['/login']); 
    } 
    return isAuthenticated; 
} 
  
}
