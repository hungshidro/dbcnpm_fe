import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList !: any;
  orderInfo !: any;

  constructor(
    private os: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder() {
    this.os.getAll().subscribe(
      value => this.orderList = value,
      error => console.log(error),
    )
  }


  changeOrderStatus(event: Event, id: any) {
    // @ts-ignore
    if (event.target.value != 0) {
      // @ts-ignore
      this.os.updateOrder({"status": event.target.value}, id).subscribe(
        data => this.getAllOrder(),
        error => console.log(error)
      );
    }
  }

  openModal(id: any) {

    console.log(id);

    let modal = document.getElementById("myModal");
    (modal as HTMLElement).style.display = "block";

    this.os.getOrder(id).subscribe(
      value => {
        this.orderInfo = value;
        console.log(this.orderInfo)
      },
    );


  }

  closeModal() {
    let modal = document.getElementById("myModal");
    (modal as HTMLElement).style.display = "none";
  }

}
