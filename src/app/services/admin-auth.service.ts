import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AdminTokenService} from "./admin-token.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn())

  authStatus = this.loggedIn.asObservable();

  constructor(
    private Token:AdminTokenService,
  ) { }

  changeAuthStatus(value : boolean){
    this.loggedIn.next(value);
  }
}
