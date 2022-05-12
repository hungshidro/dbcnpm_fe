import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DiscountService} from "../../../../services/discount.service";

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.css']
})
export class CreateDiscountComponent implements OnInit {
  createDiscountForm!: FormGroup ;
  product: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private Router: Router,
    private ds:DiscountService,
  ) { }

  ngOnInit(): void {
    this.createDiscountForm = this.fb.group({
        'product_id' : null,
        'discount_percent': null,
        'desc': null,
        'price' : null,
        'active': true,
      }
    );
  }

  onSubmit() {
    this.createDiscountForm.patchValue({'product_id': this.product?.id});

    if (this.createDiscountForm.get('active')?.value == 'active')
      this.createDiscountForm.patchValue({'active': true});
    else this.createDiscountForm.patchValue({'active': false});

    console.log(this.createDiscountForm.value);
    this.ds.create(this.createDiscountForm.value).subscribe(
      data=> this.handleRespone(data),
      error=>console.log(error),
    );
  }

  handleRespone(data : any){
    this.Router.navigateByUrl('/admin/discount')
  }

  onSearchProductClick($event: any) {
    this.product = $event;
    let searchData = document.querySelector(".search-data");
    (searchData as HTMLElement).style.display = "none";
  }
}
