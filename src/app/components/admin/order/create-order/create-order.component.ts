import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../interfaces/product";
import {ProductService} from "../../../../services/product.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {CustomerService} from "../../../../services/customer.service";
import {OrderItem} from "../../../../interfaces/order-item";
import {AddressService} from "../../../../services/address.service";
import {DeliveryServiceService} from "../../../../services/delivery-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OrderService} from "../../../../services/order.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {


  orderList: OrderItem[] = [];
  searchProducts !: any;
  searchCustomer !: any;
  customer !: any;
  address !: any;
  deliveryServices !: any;
  deliveryChoosed !:any
  total !: any;
  createCustomerForm!: FormGroup;
  name !: any;
  tel !: any;

  constructor(
    private ps : ProductService,
    private cs: CustomerService,
    private as: AddressService,
    private ds : DeliveryServiceService,
    private fb: FormBuilder,
    private os: OrderService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getDeliveryService();
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
  }

  getDeliveryService(){
    this.ds.getAll().subscribe(
      value => {
        this.deliveryServices = value;
        this.deliveryChoosed = this.deliveryServices[0];
      }
    );
  }


  onSearchProductClick(product: any) {
    let ok = false;
    this.orderList.forEach(
      p => {
        if (p.product.id == product.id){
          p.quantity ++;
          ok = true;
        }
      }
    )

    if (!ok) {
      let item = {
        'product' : product,
        'quantity' : 1,
        'price' : product.price,
      }
      this.orderList.push(item);
    }
    console.log(this.orderList);
    let searchData = document.querySelector(".search-data");
    (searchData as HTMLElement).style.display = "none";
    this.sum();

  }

  addQuantity(id: any) {
    let index = -1;
    for (let i = 0; i < this.orderList.length; i++){
      if (this.orderList[i].product.id === id)
        index = i;
    }
    if (index > -1){
      this.orderList[index].quantity++;
    }
    this.sum();

  }

  subQuantity(id: any) {
    let index = -1;
    for (let i = 0; i < this.orderList.length; i++){
      if (this.orderList[i].product.id === id)
        index = i;
    }
    if (index > -1){
      this.orderList[index].quantity > 1 ? this.orderList[index].quantity-- : this.orderList.splice(index, 1);
    }
    this.sum();

  }

  onDeleteProduct(id: any) {
    let index = -1;
    for (let i = 0; i < this.orderList.length; i++){
      if (this.orderList[i].product.id === id)
        index = i;
    }
    if (index > -1){
      this.orderList.splice(index, 1);
    }
    this.sum();
  }

  onSearchCustomer($event: KeyboardEvent) {
    let searchData = document.querySelector(".search-data-customer");
    // @ts-ignore
    if (event.target.value ){
      (searchData as HTMLElement).style.display = "flex";
      // @ts-ignore
      this.cs.getCustomer(event.target.value).pipe(
        debounceTime(1000), distinctUntilChanged())
        .subscribe(value => {
            // @ts-ignore
            this.searchCustomer = value;
          },
          error => console.log(error)
        );
    } else{
      (searchData as HTMLElement).style.display = "none";
    }
  }

  onSearchCustomerClick(customer: any) {
    this.customer = customer;
    this.name = customer.first_name + ' ' + customer.last_name;
    this.tel = customer.tel;
    let searchData = document.querySelector(".search-data-customer");
    (searchData as HTMLElement).style.display = "none";
    this.as.getAll(customer.id).subscribe(
      value => {
        // @ts-ignore
        this.address = `${value[0].homeNo} ${value[0].street} street, ${value[0].city} city, ${value[0].district} district`;
      }
    )
  }

  onChangeDelivery() {

    // @ts-ignore
    let id = document.getElementById('deliverySelect').value;
    for (let i = 0; i < this.deliveryServices.length; i++){
      if (this.deliveryServices[i].id == id){
        this.deliveryChoosed = this.deliveryServices[i];
        break;
      }
    }
  }

  sum(){
    let totalQuantity = 0;
    let totalPrice = 0;
    if (this.orderList) {
      this.orderList.map(item => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
      });
    }

    console.log(typeof this.deliveryChoosed.price)

    this.total = totalPrice + Number(this.deliveryChoosed.price);
  }

  openModal(){
    let modal = document.getElementById("myModal");

    (modal as HTMLElement).style.display = "block";

  }

  closeModal() {
    let modal = document.getElementById("myModal");

    (modal as HTMLElement).style.display = "none";
  }

  onSubmit() {
    this.cs.createCustomer(this.createCustomerForm.value).subscribe(
      data => {
        console.log(data)
        this.closeModal();
      },
      error => console.log(error),
    )
  }

  createOrder() {
    // orderList: OrderItem[] = [];
    // searchProducts !: any;
    // searchCustomer !: any;
    // customer !: any;
    // address !: any;
    // deliveryServices !: any;
    // deliveryChoosed !:any
    // total !: any;
    const formData = new FormData();
    console.log(JSON.stringify(this.orderList));
    formData.append('order_items', JSON.stringify(this.orderList));
    formData.append('customer', this.customer.id);
    formData.append('address', this.address);
    formData.append('deliveryService', this.deliveryChoosed.id);
    formData.append('name', this.name);
    formData.append('tel', this.tel);
    formData.append('total', this.total);
    // formData.append('payment_method', this.)
    // @ts-ignore
    let payment_method = document.querySelector('input[name="payment_method"]:checked').value;
    formData.append('payment_method', payment_method);
    this.os.createOrder(formData).subscribe(
      data => this.handleRespone(data),
      error=>console.log(error),
    );
  }

  handleRespone(data: any){
    this.router.navigateByUrl('/admin/order');
  }
}
