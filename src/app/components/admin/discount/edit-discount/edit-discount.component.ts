import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DiscountService} from "../../../../services/discount.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {
  updateDiscountForm!: FormGroup;
  product: any;
  discount: any;

  constructor(
    private fb: FormBuilder,
    private ds: DiscountService,
    private route: ActivatedRoute,
    private Router: Router,
  ) {
  }

  ngOnInit(): void {

    this.updateDiscountForm = this.fb.group({
        'product_id' : null,
        'discount_percent': null,
        'desc': null,
        'price' : null,
        'active': true,
      }
    );

    this.ds.getDiscount(this.route.snapshot.paramMap.get('id')).subscribe(
      discount => {
        console.log(discount);
        this.updateDiscountForm = this.fb.group({
            // @ts-ignore
            'product_id': discount.product_id,
            // @ts-ignore
            'discount_percent': discount.discount_percent,
            // @ts-ignore
            'desc': discount.desc,
            // @ts-ignore
            'price': discount.price,
            // @ts-ignore
            'active': discount.active == 1 ? 'active' : 'none',
          }
        );
        // @ts-ignore
        this.product = {
          // @ts-ignore
          'id' : discount.product_id,
          // @ts-ignore
          'image_path' : discount.image_path,
          // @ts-ignore
          'name' : discount.name,
        };

        // this.onInitActive(this.updateDiscountForm.get('active')?.value == true ? 'active' : 'none');
      }
    )


  }

  onSubmit() {
    this.updateDiscountForm.patchValue({'product_id': this.product?.id});

    if (this.updateDiscountForm.get('active')?.value == 'active')
      this.updateDiscountForm.patchValue({'active': true});
    else this.updateDiscountForm.patchValue({'active': false});

    console.log(this.updateDiscountForm.value);
    this.ds.update(this.route.snapshot.paramMap.get('id') ,this.updateDiscountForm.value).subscribe(
      data=> this.handleRespone(data),
      error=>console.log(error),
    );

  }

  onSearchProductClick($event: any) {
    this.product = $event;
    let searchData = document.querySelector(".search-data");
    (searchData as HTMLElement).style.display = "none";
  }

  onInitActive(active_value : any){

    // @ts-ignore
    let actives = document.querySelectorAll('input[type="radio"]');

    // @ts-ignore
    console.log(actives[0]);

    for( let i = 0; i < actives.length; i++){
      // @ts-ignore
      if (actives[i]?.value == active_value){
        // @ts-ignore
        actives[i].checked = true;
      }
    }
  }

  private handleRespone(data: Object) {
    this.Router.navigateByUrl('/admin/discount')
  }
}
