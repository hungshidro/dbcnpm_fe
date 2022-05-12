import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  products: any;

  totalLength: any;
  page: number= 1;

  constructor(
    private ps: ProductService
  ) { }

  ngOnInit(): void {
    this.ps.getAll().subscribe(
      data => {
        this.products = data;
        // @ts-ignore
        this.totalLength = data.length;
      }
    )
  }

  onSelectChange($event : Event) {
    // @ts-ignore
    let sortType = $event.target.value;
    if (sortType == 'desc'){
      this.products.sort((a : any, b : any) => {
        return a.price - b.price;
      })
    } else if (sortType == 'asc') {
      this.products.sort((a : any, b : any) => {
        return b.price - a.price;
      })
    } else {
      this.products.sort((a : any, b : any) => {
        return a.id - b.id;
      })
    }
  }
}
