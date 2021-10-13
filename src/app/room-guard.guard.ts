import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouteConfigLoadEnd} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomGuardGuard implements CanActivate {

  constructor(
    private route: Router
  ){}

  canActivate(url: ActivatedRouteSnapshot): boolean {
    if(localStorage.getItem('userName') == undefined){
      this.route.navigate([''])
      return false;
    }else{
      return true;
    }
  }

}
