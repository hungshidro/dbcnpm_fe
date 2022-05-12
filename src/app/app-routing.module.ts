import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AdminLoginComponent} from "./components/admin/admin-login/admin-login.component";
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {AdminSignupComponent} from "./components/admin/admin-signup/admin-signup.component";
import {
  RequestResetPasswordComponent
} from "./components/admin/password/request-reset-password/request-reset-password.component";
import {
  ResponseResetPasswordComponent
} from "./components/admin/password/response-reset-password/response-reset-password.component";
import {AdminBeforeLoginService} from "./services/admin-before-login.service";
import {AdminAfterLoginService} from "./services/admin-after-login.service";
import {ProductsComponent} from "./components/admin/products/products.component";
import {CreateProductComponent} from "./components/admin/products/create-product/create-product.component";
import {CreateOrderComponent} from "./components/admin/order/create-order/create-order.component";
import {OrderComponent} from "./components/admin/order/order.component";
import {EditOrderComponent} from "./components/admin/order/edit-order/edit-order.component";
import {EditProductComponent} from "./components/admin/products/edit-product/edit-product.component";
import {CustomerComponent} from "./components/admin/customer/customer.component";
import {EditCustomerComponent} from "./components/admin/customer/edit-customer/edit-customer.component";
import {DiscountComponent} from "./components/admin/discount/discount.component";
import {CreateDiscountComponent} from "./components/admin/discount/create-discount/create-discount.component";
import {EditDiscountComponent} from "./components/admin/discount/edit-discount/edit-discount.component";
import {ProductPageComponent} from "./components/home/product-page/product-page.component";
import {ProductDetailComponent} from "./components/home/product-detail/product-detail.component";
import {CartComponent} from "./components/home/cart/cart.component";
import {PlaceOrderComponent} from "./components/home/place-order/place-order.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product',
    component: ProductPageComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'order',
    component: PlaceOrderComponent,
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminAfterLoginService]

  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    canActivate: [AdminBeforeLoginService]
  },

  {
    path: 'admin/product',
    component: ProductsComponent,
    canActivate: [AdminAfterLoginService]

  },
  {
    path: 'admin/product/create',
    component: CreateProductComponent,
    canActivate: [AdminAfterLoginService]

  },
  {
    path: 'admin/product/edit/:id',
    component: EditProductComponent,
    canActivate: [AdminAfterLoginService]

  },
  {
    path: 'admin/order',
    component: OrderComponent,
    canActivate: [AdminAfterLoginService]

  },
  {
    path: 'admin/order/create',
    component: CreateOrderComponent,
    canActivate: [AdminAfterLoginService]

  },
  {
    path: 'admin/order/edit/:id',
    component: EditOrderComponent,
    canActivate: [AdminAfterLoginService]

  },
  {
    path: 'admin/customer',
    component: CustomerComponent,
    canActivate: [AdminAfterLoginService]

  },
  {
    path: 'admin/customer/edit/:id',
    component: EditCustomerComponent,
    canActivate: [AdminAfterLoginService]

  },
  {
    path: 'admin/signup',
    component: AdminSignupComponent,
    canActivate: [AdminBeforeLoginService]

  },
  {
    path: 'admin/request-password-reset',
    component: RequestResetPasswordComponent,
    canActivate: [AdminBeforeLoginService]
  },
  {
    path: 'admin/response-password-reset',
    component: ResponseResetPasswordComponent,
    canActivate: [AdminBeforeLoginService]

  },
  {
    path: 'admin/discount',
    component: DiscountComponent,
    canActivate: [AdminAfterLoginService]
  },
  {
    path: 'admin/discount/create',
    component: CreateDiscountComponent,
    canActivate: [AdminAfterLoginService]
  },
  {
    path: 'admin/discount/edit/:id',
    component: EditDiscountComponent,
    canActivate: [AdminAfterLoginService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
