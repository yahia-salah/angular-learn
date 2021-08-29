import { Category } from 'shared/models/category.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    let aflCategories = this.db.list('/categories', (category) =>
      category.orderByChild('name')
    );
    return aflCategories.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          let category: Category = {
            id: c.payload.key || '',
            name: (c.payload.val() as any).name,
          };
          return category;
        })
      )
    );
  }
}
