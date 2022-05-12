import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: any;

  constructor(
    private ps: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.ps.getAll().subscribe(
      data => {
        return this.products = data;
      },
      error => console.log(error),
    );
  }

  onDelete(id:any) {
    this.ps.onDelete(id).subscribe(
      data=>this.handleDelete(data),
      error=>console.log(error)
    );
  }

  handleDelete(data: any){
    this.ps.getAll().subscribe(
      data => {
        return this.products = data;
      },
      error => console.log(error),
    );
  }

  onSearchProductClick($event: any) {
    this.products = [$event];
    let searchData = document.querySelector(".search-data");
    (searchData as HTMLElement).style.display = "none";
  }
}
