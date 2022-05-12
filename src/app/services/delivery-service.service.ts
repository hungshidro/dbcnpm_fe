import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeliveryServiceService {

  baseUrl = 'https://frozen-journey-44080.herokuapp.com/api/deliveryService'


  constructor(
    private http: HttpClient,
  ) { }

  getAll(){
    return this.http.get(`${this.baseUrl}`);
  }
}
