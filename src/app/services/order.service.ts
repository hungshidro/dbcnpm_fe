import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'https://frozen-journey-44080.herokuapp.com/api/order';

  constructor(
    private http: HttpClient,
  ) { }

  createOrder(data : any){
    return this.http.post(this.baseUrl,data);
  }

  getAll(){
    return this.http.get(this.baseUrl);
  }

  updateOrder(value: any, id: any){
    return this.http.put(`${this.baseUrl}/${id}`,value);
  }

  getOrder(id: any){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  recentOrder(){
    return this.http.get(`${this.baseUrl}/recent`);
  }

  totalOrder(){
    return this.http.get(`${this.baseUrl}/total`);
  }

  totalProfit(){
    return this.http.get(`${this.baseUrl}/profit`);
  }
}
