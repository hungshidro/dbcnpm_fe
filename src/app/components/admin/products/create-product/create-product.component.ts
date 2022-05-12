import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProductForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private Router: Router,
    ) { }

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      'name' : null,
      'category_id': null,
      'description': null,
      'price' : null,
      'image': null,
      'image_source':null,
      }
    );
  }

  onSubmit(){
    // @ts-ignore

    // console.log(this.createProductForm.value)

    const formData = new FormData();
    formData.append('image', this.createProductForm.get('image_source')?.value);
    formData.append('name', this.createProductForm.get('name')?.value);
    formData.append('description', this.createProductForm.get('description')?.value);
    formData.append('price', this.createProductForm.get('price')?.value);
    formData.append('category_id', this.createProductForm.get('category_id')?.value);



    // this.createProductForm.append('image', this.createProductForm.get('image_source').value);
    this.http.post('http://localhost:8000/api/product', formData).subscribe(
      data=> this.handleRespone(data),
      error=>console.log(error),
    );
  }

  onFileChange(event: Event) {
      // @ts-ignore
    if (event.target.files.length > 0) {
      // @ts-ignore
      const file = event.target.files[0];
      this.createProductForm.patchValue({
        image_source: file
      })
      // @ts-ignore
      // this.createProductForm.get('image').updateValueAndValidity()
    }
  }

  handleRespone(data : any){
    this.Router.navigateByUrl('/admin/product')
  }


}
