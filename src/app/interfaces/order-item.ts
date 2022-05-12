import {Product} from "./product";

export interface OrderItem {
  product: Product,
  price: number,
  quantity: number,
}
