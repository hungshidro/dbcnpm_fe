import { Component, OnInit } from '@angular/core';
import {AdminAuthService} from "../../services/admin-auth.service";
import {Router} from "@angular/router";
import {AdminTokenService} from "../../services/admin-token.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public loggedIn : boolean | undefined

  constructor(
    private Auth: AdminAuthService,
    private router: Router,
    private Token: AdminTokenService,
  ) { }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value)
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/admin/login')
  }
}
