import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../../services/cart.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  randomProducts: any;
  quantity : number = 1;

  constructor(
    private ps: ProductService,
    private route: ActivatedRoute,
    private ca: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ps.getProductById(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.product = data;
      }
    )
    this.ps.getFeatureProduct().subscribe(
      abc => {
        this.randomProducts = abc;
      }
    )
  }


  addCart(product: any) {
    product.qnt = this.quantity;
    let cartData = localStorage.getItem('localCart');
    // console.log(cartData);
    if (cartData === null) {
      let cartItems: any = [];
      cartItems.push(product);
      localStorage.setItem('localCart', JSON.stringify(cartItems));
      this.ca.updateCart(cartItems);
    }else {
      let id = product.id;
      let index: number = -1;
      cartData = JSON.parse(cartData);
      // @ts-ignore
      for (let i = 0; i < cartData.length; i++){
        // @ts-ignore
        if (id == cartData[i].id){
          // @ts-ignore
          cartData[i].qnt = +cartData[i].qnt + product.qnt;
          // @ts-ignore
          index = i;
          localStorage.setItem('localCart', JSON.stringify(cartData));
          this.ca.updateCart(cartData);
          break;
        }
      }

      if (index == -1) {
        // @ts-ignore
        cartData.push(product);
        localStorage.setItem('localCart', JSON.stringify(cartData));
        this.ca.updateCart(cartData);
      }
    }
    this.toastr.success('Successfully Added To Your Cart')
  }

  changeQuantity($event: Event) {
    // @ts-ignore
    this.quantity = parseInt($event?.target?.value);
  }
}
