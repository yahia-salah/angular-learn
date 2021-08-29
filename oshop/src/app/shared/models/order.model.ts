import { Item } from './item.model';
import * as moment from 'moment-timezone';

export class Order {
  id?: string;
  datePlaced: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  phone: string;
  paymentMethod: string;
  items: Item[] = [];
  userId: string;
  status: string;

  constructor(init?: Partial<Order>) {
    var currentTime = moment();
    this.datePlaced = currentTime
      .tz('Africa/Cairo')
      .format('YYYY-MM-DD hh:mm:ss');
    this.status = 'In Process';
    if (init) Object.assign(this, init);
  }

  get TotalQuantity(): number {
    let quantity = 0;

    this.items.forEach((i) => (quantity += i.quantity));

    return quantity;
  }

  get TotalPrice(): number {
    let price = 0;

    this.items.forEach((i) => (price += i.TotalPrice));

    return price;
  }
}
