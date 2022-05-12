import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminTokenService {

  private iss = {
    login: 'https://frozen-journey-44080.herokuapp.com/api/admin/login',
    signup: 'https://frozen-journey-44080.herokuapp.com/api/admin/signup',
  }

  constructor() { }

  handle(token: any) {
    this.set(token);
    console.log(this.isValid());
  }

  set(token: any){
    localStorage.setItem('token', token);
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    localStorage.removeItem('token');
  }

  isValid(){
    const token = this.get();
    if (this.get()){
      const payload = this.payload(token);
      if (payload){
        return Object.values(this.iss).indexOf(payload.iss) > -1;
      }
    }
    return false;
  }

  private payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  private decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  loggedIn(){
    return this.isValid();
  }

}
