import { Product } from 'shared/models/product.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  createProduct(product: Product) {
    return this.db.list('/products').push(product);
  }

  updateProduct(product: Product) {
    return this.db
      .object('/products/' + product.id)
      .update(_.omit(product, ['id']));
  }

  get(productId: string) {
    return this.db
      .object('/products/' + productId)
      .snapshotChanges()
      .pipe(
        map((c) => {
          let product: Product = {
            id: c.payload.key || '',
            title: (c.payload.val() as any).title,
            price: (c.payload.val() as any).price,
            imageUrl: (c.payload.val() as any).imageUrl,
            category: (c.payload.val() as any).category,
          };
          return product;
        })
      );
  }

  getAll() {
    let aflCategories = this.db.list('/products', (product) =>
      product.orderByChild('title')
    );
    return aflCategories.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          let product: Product = {
            id: c.payload.key || '',
            title: (c.payload.val() as any).title,
            price: (c.payload.val() as any).price,
            imageUrl: (c.payload.val() as any).imageUrl,
            category: (c.payload.val() as any).category,
          };
          return product;
        })
      )
    );
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
