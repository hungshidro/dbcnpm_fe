import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  @Input() product: any;
  @Output() deleteItem = new EventEmitter<any>();
  @Output() addQuanItem = new EventEmitter<any>();
  @Output() subQuanItem = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteProduct(id : any) {
    this.deleteItem.emit(id);
  }

  addQuantity(id : any) {
    this.addQuanItem.emit(id);
  }

  subQuantity(id : any) {
    this.subQuanItem.emit(id);
  }
}
