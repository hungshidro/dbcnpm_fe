import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AdminUserService} from "../../../services/admin-user.service";
import {AdminTokenService} from "../../../services/admin-token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  signUpForm !: FormGroup;

  error = {
    first_name: null,
    last_name: null,
    email: null,
    username: null,
    password: null,
    password_confirmation: null,
  };

  constructor(
    private fb:FormBuilder,
    private adService:AdminUserService,
    private token:AdminTokenService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      first_name: null,
      last_name: null,
      email:null,
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/),
        ]),
      ],
      password_confirmation: null,
    })
  }

  onSubmit(){
    this.adService.signup(this.signUpForm.value).subscribe(
      data => this.handleResponse(data),
      error=> this.handleError(error)
    );
  }

  // @ts-ignore
   handleError(error) {
    this.error.first_name = error.error?.errors?.first_name;
    this.error.last_name = error.error?.errors?.last_name;
    this.error.username = error.error?.errors?.username;
    this.error.email = error.error?.errors?.email;
    this.error.password = error.error?.errors?.password;

    console.log(this.error);

  }

  handleResponse(data:any){
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/admin');
  }

  get username(){
    return this.signUpForm.get('username');
  }
}
