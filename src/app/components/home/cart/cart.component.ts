import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {Router} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  total : any;

  constructor(
    private ca: CartService,
    private router : Router,
    private toast : ToastrService,
  ) { }

  ngOnInit(): void {
    this.ca.cartItems.subscribe(
      data => {
        this.cartItems = data;
        this.total = this.totalCart(data);
      }
    )
  }

  addQuantity(index : any) {
    this.cartItems[index].qnt++;
    this.updateCart(this.cartItems);
  }

  subQuantity(index : any) {
    if (this.cartItems[index].qnt > 1) {
      this.cartItems[index].qnt--;
      this.updateCart(this.cartItems);
    }
    else {
      this.onDelete(index);
    }
  }

  onDelete(index : any) {
      this.cartItems.splice(index, 1);
      this.updateCart(this.cartItems);
  }

  updateCart(value : any){
    localStorage.setItem('localCart', JSON.stringify(value));
    this.ca.updateCart(value);
  }

  totalCart(cart: any = []){
    let sum = 0;
    for (let i = 0;  i < cart.length; i++){
      if (cart[i].discount_price){
        sum += cart[i].discount_price * cart[i].qnt;
      }
      else sum += cart[i].price * cart[i].qnt;
    }
    return sum;
  }

  redirectOrder() {
    if(this.cartItems.length  == 0 || this.cartItems == null){
      this.toast.warning('You have nothing in your cart. Please add something to place your order !');
    }
    else {
      this.router.navigateByUrl('/order');
    }
  }
}
