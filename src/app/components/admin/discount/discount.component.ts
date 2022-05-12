import { Component, OnInit } from '@angular/core';
import {DiscountService} from "../../../services/discount.service";

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  discounts : any;

  constructor(
    private ds : DiscountService,
  ) { }

  ngOnInit(): void {
    this.ds.getAll().subscribe(
      data => {
        return this.discounts = data;
      }
    )
  }

  onDelete(id:any) {
    this.ds.onDelete(id).subscribe(
      data=>this.handleDelete(data),
      error=>console.log(error)
    );
  }

  handleDelete(data: any){
    this.ds.getAll().subscribe(
      data => {
        return this.discounts = data;
      },
      error => console.log(error),
    );
  }
}
