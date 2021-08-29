import { Item } from 'shared/models/item.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Order } from 'shared/models/order.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order: Order) {
    let result = (await this.db.list('/orders').push(_.omit(order, ['id'])))
      .key;
    await this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db
      .list('/orders')
      .snapshotChanges()
      .pipe(
        map((o) => {
          let orders: Order[] = o.map((order) => {
            return new Order({
              id: order.payload.key || '',
              name: (order.payload.val() as any).name,
              addressLine1: (order.payload.val() as any).addressLine1,
              addressLine2: (order.payload.val() as any).addressLine2,
              city: (order.payload.val() as any).city,
              phone: (order.payload.val() as any).phone,
              paymentMethod: (order.payload.val() as any).paymentMethod,
              userId: (order.payload.val() as any).userId,
              datePlaced: (order.payload.val() as any).datePlaced,
              status: (order.payload.val() as any).status || 'In Process',
              items: (order.payload.val() as any).items.map(
                (i: any) => new Item({ ...i })
              ),
            });
          });

          return orders;
        })
      );
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list('/orders', (ref) => {
        return ref.orderByChild('userId').equalTo(userId);
      })
      .snapshotChanges()
      .pipe(
        map((o) => {
          let orders: Order[] = o.map((order) => {
            return new Order({
              id: order.payload.key || '',
              name: (order.payload.val() as any).name,
              addressLine1: (order.payload.val() as any).addressLine1,
              addressLine2: (order.payload.val() as any).addressLine2,
              city: (order.payload.val() as any).city,
              phone: (order.payload.val() as any).phone,
              paymentMethod: (order.payload.val() as any).paymentMethod,
              userId: (order.payload.val() as any).userId,
              datePlaced: (order.payload.val() as any).datePlaced,
              status: (order.payload.val() as any).status || 'In Process',
              items: (order.payload.val() as any).items.map(
                (i: any) => new Item({ ...i })
              ),
            });
          });

          return orders.reverse();
        })
      );
  }

  updateOrder(order: Order) {
    return this.db.object('/orders/' + order.id).update(_.omit(order, ['id']));
  }
}
