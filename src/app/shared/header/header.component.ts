import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartNumber: any;

  constructor(
    private ca: CartService,
  ) { }

  ngOnInit(): void {
    this.ca.cartItems.subscribe(
      data => {
        this.cartNumber = data?.length;
        console.log(data);
      }
    )
  }

}
