import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredProduct:any;
  latestProduct: any;
  latestProduct_1 : any = [];
  latestProduct_2 : any = [];

  constructor(
    private ps: ProductService,
  ) { }

  ngOnInit(): void {
    this.ps.getFeatureProduct().subscribe(
      data => {
        this.featuredProduct = data;
      }
    )
    this.ps.getLatestProduct().subscribe(
      data=> {
        console.log(data);
        this.latestProduct = data;
        for(let i = 0; i < 4; i++){
          this.latestProduct_1.push(this.latestProduct[i]);
          this.latestProduct_2.push(this.latestProduct[i + 4]);
        }
      }
    )
  }


}
