import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {AddressService} from "../../services/address.service";

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {
  searchCustomers: any;
  @Output() customerSearched = new EventEmitter();

  constructor(
    private cs: CustomerService,
    private as: AddressService
  ) {
  }

  ngOnInit(): void {
  }

  onSearchCustomer($event: KeyboardEvent) {
    let searchData = document.querySelector(".search-data");
    // @ts-ignore
    if (event.target.value) {
      (searchData as HTMLElement).style.display = "block";
      // @ts-ignore
      this.cs.getCustomer(event.target.value).pipe(
        debounceTime(1000), distinctUntilChanged())
        .subscribe(value => {
            // @ts-ignore
            this.searchCustomers = value
          },
          error => console.log(error)
        );
    } else {
      (searchData as HTMLElement).style.display = "none";
    }
  }

  onSearchCustomerClick(customer: any) {
    this.as.getAll(customer.id).subscribe(
      value => {
        customer.address = value;
        this.customerSearched.emit(customer);
      }
    )
  }
}
