import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<any>(null);

  cartItems = this.cart.asObservable();

  constructor() {
    this.initCart();
  }

  updateCart(cartData : any) {
    this.cart.next(cartData);
  }

  initCart(){
    let cartData = localStorage.getItem('localCart');
    if (cartData != null) {
      this.updateCart(JSON.parse(cartData));
    }
  }



}
