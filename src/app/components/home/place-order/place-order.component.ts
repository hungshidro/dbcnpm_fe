import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OrderService} from "../../../services/order.service";
import {CustomerService} from "../../../services/customer.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  orderList: any = [];
  cartItems : any = [];
  total: any;
  createCustomerForm!: FormGroup;
  constructor(
    private ca: CartService,
    private fb: FormBuilder,
    private os: OrderService,
    private cs: CustomerService,
    private toast: ToastrService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.createCustomerForm = this.fb.group({
        'first_name' : null,
        'last_name': null,
        'gender': null,
        'dob' : null,
        'tel' : null,
        'homeNo' : null,
        'street' : null,
        'city' : null,
        'district' : null,
      }
    );

    this.ca.cartItems.subscribe(
      data => {
        this.cartItems = data;
        this.total = this.totalCart(data);
        this.orderList = data;
        for (let i = 0; i < this.orderList.length; i++){
          this.orderList[i].product = {'id' : this.orderList[i].id};
          this.orderList[i].price = this.orderList[i].discount_price?  this.orderList[i].discount_price : this.orderList[i].price;
          this.orderList[i].quantity = this.orderList[i].qnt;
        }
        console.log(this.orderList)
      }
    )
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

  onSubmit() {
    console.log(this.createCustomerForm.value);
    // @ts-ignore

    const formData = new FormData();

    this.cs.createCustomer(this.createCustomerForm.value).subscribe(
      data => {
        this.cs.getLatestCustomer().subscribe(
          customer => {
            const formData = new FormData();
            console.log(JSON.stringify(this.orderList));
            formData.append('order_items', JSON.stringify(this.orderList));
            // @ts-ignore
            formData.append('customer', customer.id);
            formData.append('address', `${this.createCustomerForm} ${this.createCustomerForm.get('street')?.value} Street, ${this.createCustomerForm.get('city')?.value} City, ${this.createCustomerForm.get('district')?.value} District`);
            formData.append('deliveryService', '1');
            // @ts-ignore
            formData.append('name', customer.first_name + ' ' + customer.last_name);
            formData.append('tel', this.createCustomerForm.get('tel')?.value);
            formData.append('total', this.total);
            // @ts-ignore
            let payment = document.querySelector('input[name="paymentMethod"]:checked').value;
            formData.append('payment_method', payment);
            this.os.createOrder(formData).subscribe(
              data => this.handleRespone(data),
              error=>console.log(error),
            );
          }
        )
      }
    )

  }

  handleRespone(data: Object) {
      this.toast.success('Successfully Place An Order!');
      this.route.navigateByUrl('/');
  }
}
