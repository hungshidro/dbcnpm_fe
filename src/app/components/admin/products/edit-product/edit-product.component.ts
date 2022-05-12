import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../../../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup;
  url : any;
  product !: any
  private productId: any;

  constructor(
    private http: HttpClient,
    private ps: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private Router: Router,
  ) {
    this.editProductForm = this.fb.group({
      'name': null,
      'category_id': null,
      'description': null,
      'price': null,
      'image': null,
      'image_source': null,
    });
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.ps.getProductById(this.productId).subscribe(
      value => {
        this.product = value;
        this.url = this.product.image_path;
        console.log(this.product)
        // @ts-ignore
        document.getElementById("categoryList").value=this.product.category_id;
      }
    )
  }

  onFileChange($event: Event) {
    // @ts-ignore
    if (event.target.files.length > 0) {
      // @ts-ignore
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=(event: any) => {
        this.url = event.target.result;
      }
      this.editProductForm.patchValue({
        image_source: file
      })
    }

  }

  onSubmit() {


    const formData = new FormData();
    formData.append('image', this.editProductForm.get('image_source')?.value);
    // @ts-ignore
    formData.append('name', document.getElementById("exampleInputEmail1").value);
    // @ts-ignore
    formData.append('description', document.getElementById("exampleInputPassword1").value);
    // @ts-ignore
    formData.append('price', document.getElementById("exampleInputPrice1").value);
    // @ts-ignore
    formData.append('category_id', document.getElementById("categoryList").value);


    this.ps.updateProduct(this.productId, formData).subscribe(
      value => {
        console.log(value);
        this.Router.navigateByUrl("/admin/product");
      }
    )

  }
}
