import { Cart } from './../models/cart.model';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product.model';
import { ProductService } from 'src/app/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string = '';
  cart: Cart;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.category = params.get('category') || '';
          return productService.getAll();
        })
      )
      .subscribe((products) => {
        this.products = products;
        this.filteredProducts = this.products.filter(
          (p) => !this.category || p.category == this.category
        );
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  getQuantity(product: Product) {
    if (!this.cart) return 0;

    let item = this.cart.items.find((i) => i.product.id == product.id);
    if (!item) return 0;

    return item.quantity;
  }
}
