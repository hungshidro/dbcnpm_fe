import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'https://frozen-journey-44080.herokuapp.com/api/product';

  constructor(
    private http:HttpClient,
  ) { }

  getAll(){
    return this.http.get(`${this.baseUrl}`);
  }

  onDelete(id: any){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getProduct(name: any){
    // @ts-ignore
    return this.http.post(`${this.baseUrl}/search?name=${name}`);
  }

  getProductById(id :any){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: any, data: any) {
    return this.http.post(`${this.baseUrl}/${id}`, data);
  }

  total(){
    return this.http.get(`${this.baseUrl}/total`);
  }

  topSale(){
    return this.http.get(`${this.baseUrl}/profit`)
  }

  getFeatureProduct() {
    return this.http.get(`${this.baseUrl}/feature`)
  }

  getLatestProduct(){
    return this.http.get(`${this.baseUrl}/latest`)
  }

}
