import { Item } from './models/item.model';
import { Cart } from './models/cart.model';
import { Product } from './models/product.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      createdDate: new Date().getTime(),
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();

    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map((c) => {
          let items: { key: string; value: any }[] = [];

          if ((c.payload.val() as any).items) {
            let itemsKeys = Object.keys((c.payload.val() as any).items);
            let itemsValues = Object.values((c.payload.val() as any).items);
            for (let i = 0; i < itemsKeys.length; i++)
              items.push({ key: itemsKeys[i], value: itemsValues[i] });
          }
          let cart: Cart = new Cart();
          cart.id = c.payload.key || '';
          cart.createdDate = (c.payload.val() as any).createdDate;
          cart.items = items.map((i) => {
            let itemMap = {
              quantity: i.value.quantity,
              product: i.value.product,
            };
            let item: Item = new Item({ ...itemMap });
            item.product.id = i.key;
            return item;
          });

          return cart;
        })
      );
  }

  private getItem(cartId: string, productId: string | undefined) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key || '');
    return result.key || '';
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.id);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        if (item.key)
          item$.update({ quantity: (item.payload.val() as any).quantity + 1 });
        else item$.set({ product: _.omit(product, ['id']), quantity: 1 });
      });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.id);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        if (item.key) {
          let quantity: number = (item.payload.val() as any).quantity;
          if (quantity > 1) item$.update({ quantity: quantity - 1 });
          else item$.remove();
        }
      });
  }

  async deleteItem(product: Product) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.id);

    item$.remove();
  }
}
