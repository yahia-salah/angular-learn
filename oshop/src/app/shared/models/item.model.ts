import { Product } from './product.model';
export class Item {
  product: Product;
  quantity: number;

  constructor(init?: Partial<Item>) {
    if (init) Object.assign(this, init);
  }

  get TotalPrice() {
    return this.quantity * this.product.price;
  }
}
