import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AdminUserService} from "../../../services/admin-user.service";
import {AdminTokenService} from "../../../services/admin-token.service";
import {Router} from "@angular/router";
import {AdminAuthService} from "../../../services/admin-auth.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;
  error = null;
  constructor(
    private fb:FormBuilder,
    private adService:AdminUserService,
    private token:AdminTokenService,
    private router: Router,
    private Auth: AdminAuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: null,
      password: null,
      rememberMe: false,
    })
  }

  onSubmit() {
    this.adService.login(this.loginForm.value).subscribe(
      data => this.handleResponse(data),
      error=> this.handleError(error)
    );
  }

  // @ts-ignore
  handleError(error){
    this.error = error.error.error;
  }
  handleResponse(data: Object) {
    // @ts-ignore
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/admin');
    this.Auth.changeAuthStatus(true);
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
