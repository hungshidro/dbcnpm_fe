import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {OrderService} from "../../../../services/order.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DeliveryServiceService} from "../../../../services/delivery-service.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {ProductService} from "../../../../services/product.service";
import {CustomerService} from "../../../../services/customer.service";
import {AddressService} from "../../../../services/address.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  searchProducts: any;
  orderList: any;
  searchCustomer: any;
  createCustomerForm !: FormGroup;
  name: any;
  address: any;
  tel: any;
  deliveryServices: any;
  deliveryChoosed = {
    id: null,
    name: null,
    price: null,
  };
  total: number | undefined;
  orderInfo !: any;
  customerId : any;
  payment_method: any;
  orderId : any;

  constructor(
    private route: ActivatedRoute,
    private os: OrderService,
    private fb: FormBuilder,
    private ds: DeliveryServiceService,
    private ps : ProductService,
    private cs: CustomerService,
    private as: AddressService,
    private Router : Router
  ) {
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
    })
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.os.getOrder(this.orderId).subscribe(
      data=>{
        this.orderInfo = data;
        console.log(this.orderInfo);
        this.orderList = this.orderInfo['item'];
        this.name = this.orderInfo['order'].name;
        this.address = this.orderInfo['order'].address;
        this.tel = this.orderInfo['order'].tel;
        this.total = this.orderInfo['order'].total;
        this.customerId = this.orderInfo['order'].customer_id;
        this.deliveryChoosed['id'] = this.orderInfo['order'].deli_id;
        this.deliveryChoosed['name'] = this.orderInfo['order'].deli_name;
        this.deliveryChoosed['price'] = this.orderInfo['order'].deli_price;
        this.payment_method = this.orderInfo['order'].payment_method;
        this.onInitPaymnetMethod(this.payment_method);
        this.ds.getAll().subscribe(
          value => this.deliveryServices = value,
          );
      }
    );

  }

  onInitPaymnetMethod(payment_method : any){
    // @ts-ignore
    let payments = document.querySelectorAll('input[name="payment_method"]');
    console.log(payments)
    for( let i = 0; i < payments.length; i++){
      // @ts-ignore
      if (payments[i]?.value == payment_method){
        // @ts-ignore
        payments[i]?.checked = true;
      }
    }
  }

  onSearchProduct(event : Event) {
    let searchData = document.querySelector(".search-data");
    // @ts-ignore
    if (event.target.value ){
      (searchData as HTMLElement).style.display = "block";
      // @ts-ignore
      this.ps.getProduct(event.target.value).pipe(
        debounceTime(1000), distinctUntilChanged())
        .subscribe(value => {
            // @ts-ignore
            this.searchProducts = value
          },
          error => console.log(error)
        );
    } else{
      (searchData as HTMLElement).style.display = "none";
    }
  }

  onSearchProductClick(product: any) {
    let ok = false;

    this.orderList.forEach(
      // @ts-ignore
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
    this.customerId = customer.id;
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
      // @ts-ignore
      this.orderList.map(item => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
      });
    }

    console.log(typeof this.deliveryChoosed.price)

    this.total = totalPrice + Number(this.deliveryChoosed.price);
  }


  openModal(){
    var modal = document.getElementById("myModal");

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

  editOrder() {
    // @ts-ignore
    let pay_method = document.querySelector('input[name="payment_method"]:checked').value;

    let data = {
      'order_items': JSON.stringify(this.orderList),
      'customer': this.customerId,
      'address': this.address,
      'deliveryService': this.deliveryChoosed.id,
      'name': this.name,
      'tel': this.tel,
      'total': this.total,
      'payment_method': pay_method
    };

    console.log(data);

    this.os.updateOrder(data , this.orderId).subscribe(
      data => this.handleResponse(data),
    );
  }

  handleResponse(data :any){
    this.Router.navigateByUrl('/admin/order');
  }
}
