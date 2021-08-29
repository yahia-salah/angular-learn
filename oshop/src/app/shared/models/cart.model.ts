import { Item } from './item.model';

export class Cart {
  id?: string;
  createdDate: string;
  items: Item[] = [];

  get TotalQuantity() {
    let quantity = 0;

    this.items.forEach((i) => (quantity += i.quantity));

    return quantity;
  }

  get TotalPrice() {
    let price = 0;

    this.items.forEach((i) => (price += i.TotalPrice));

    return price;
  }
}
