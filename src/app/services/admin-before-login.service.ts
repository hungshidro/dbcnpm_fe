import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AdminTokenService} from "./admin-token.service";

@Injectable({
  providedIn: 'root'
})
export class AdminBeforeLoginService implements CanActivate{

  constructor(
    private token: AdminTokenService,
    private router:Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.token.loggedIn()){
      return true
    }
    this.router.navigateByUrl('/admin/dashboard');
    return false;

  }
}
