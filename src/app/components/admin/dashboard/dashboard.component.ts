import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {OrderService} from "../../../services/order.service";
import {ProductService} from "../../../services/product.service";
import {forkJoin} from "rxjs";
import {dateToYMD} from "../../../services/changeDateFormat";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalProduct : any;
  totalOrder: any;
  totalCustomer: any;
  totalProfit: any;
  orderRecent: any;
  topProduct: any;

  constructor(
    private cs: CustomerService,
    private os: OrderService,
    private ps: ProductService,
  ) { }

  ngOnInit(): void {

    forkJoin([
      this.cs.total(),
      this.os.totalOrder(),
      this.os.totalProfit(),
      this.os.recentOrder(),
      this.ps.total(),
      this.ps.topSale(),
    ]).subscribe(
      results =>{
        this.totalCustomer = results[0];
        this.totalOrder = results[1];
        this.totalProfit = results[2];
        this.orderRecent = results[3];
        this.totalProduct = results[4];
        this.topProduct = results[5];
        this.formatDate(this.orderRecent);
        console.log(this.topProduct);
      }
    );
  }


  formatDate(data : any){
    for (let i = 0; i < data.length; i++) {
      data[i].order_date = dateToYMD(new Date(data[i].order_date));
    }
  }


}
