import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = 'https://frozen-journey-44080.herokuapp.com/api/customer'

  constructor(
    private http:HttpClient,
  ) { }

  getAll(){
    return this.http.get(`${this.baseUrl}`);
  }

  getCustomer(value: any){
    // @ts-ignore
    return this.http.post(`${this.baseUrl}/search?name=${value}`);
  }

  createCustomer(value: any) {
    return this.http.post(this.baseUrl, value);
  }

  getCustomerById(id: any){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  delete(id :any){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateCustomer(data: any, customerId: any) {
    return this.http.put(`${this.baseUrl}/${customerId}`, data);
  }

  total(){
    return this.http.get(`${this.baseUrl}/total`);
  }


  getLatestCustomer() {
    return this.http.get(`${this.baseUrl}/latest`)
  }
}
