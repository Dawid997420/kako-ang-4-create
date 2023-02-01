import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpServiceService } from '../services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 


  constructor(private httpService: HttpServiceService,
    private authService :AuthService){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    
      
      
 
     return this.authService.isLoggedIn();

      
    
  }





  
}
