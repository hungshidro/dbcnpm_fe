import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {$e} from "@angular/compiler/src/chars";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers !: any;
  createCustomerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cs: CustomerService
) { }

  ngOnInit(): void {
    this.getAll();
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

  getAll(){
    this.cs.getAll().subscribe(
      value => {
        this.customers = value;
      }
    )
  }

  onDelete(id : any) {
    this.cs.delete(id).subscribe(
      value => {
        this.getAll();
      }
    )
  }

  onSearchCustomer($event: any) {
    this.customers=[$event];
    let searchData = document.querySelector(".search-data");
    (searchData as HTMLElement).style.display = "none";
  }

  openModal() {
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
        this.getAll();
      },
      error => console.log(error),
    )
  }
}
