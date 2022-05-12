import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {Output, EventEmitter} from "@angular/core";


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  searchProducts: any;
  @Output() productSearched = new EventEmitter();

  constructor(
    private ps: ProductService,
  ) { }

  ngOnInit(): void {

  }

  onSearchProduct(event : Event) {
    let searchData = document.querySelector(".search-data");
    // @ts-ignore
    if (event.target.value ){
      (searchData as HTMLElement).style.display = "block";
      // @ts-ignore
      this.ps.getProduct(event.target.value).pipe(
        debounceTime(1000), distinctUntilChanged())
        .subscribe(value => {
            // @ts-ignore
            this.searchProducts = value
          },
          error => console.log(error)
        );
    } else{
      (searchData as HTMLElement).style.display = "none";
    }
  }

  onSearchProductClick(product: any) {
    this.productSearched.emit(product);
  }
}
