import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-regular-header',
  templateUrl: './regular-header.component.html',
  styleUrls: ['./regular-header.component.css']
})
export class RegularHeaderComponent implements OnInit {
  cartNumber: any;

  constructor(
    private ca: CartService
  ) { }

  ngOnInit(): void {
    this.ca.cartItems.subscribe(
      data => {
        this.cartNumber = data?.length;
      }
    )
  }

}
