import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpectatorGuard implements CanActivate {


  constructor(private authService :AuthService
    , private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      console.log(this.authService.getRole())

      if (    this.authService.getRole()=='SPECTATOR' || !this.authService.isLoggedIn() ) {
        

       
       
        return true;
      } else {
        this.router.navigateByUrl("")
        return false;
      }
      

  }
  
}
