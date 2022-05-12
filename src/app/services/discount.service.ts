import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  baseUrl = 'https://frozen-journey-44080.herokuapp.com/api/discount'

  constructor(
    private http:HttpClient,
  ) { }

  getAll(){
    return this.http.get(`${this.baseUrl}`);
  }

  create(discount: any){
    return this.http.post(`${this.baseUrl}`, discount);
  }

  onDelete(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getDiscount(id: any) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  update(id: any, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
