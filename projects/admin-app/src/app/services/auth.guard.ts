import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'projects/admin-app/services/auth.service';
import { StorageService } from 'projects/admin-app/services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( 
    private authService: AuthService, 
    private router: Router,
    private tokenService: StorageService
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
