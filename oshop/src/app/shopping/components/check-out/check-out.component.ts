import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs';
import { Cart } from 'shared/models/cart.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Order } from 'shared/models/order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  form: FormGroup;
  cart: Cart;
  userId?: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      name: fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      addressLine1: fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      addressLine2: fb.control('', [
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      phone: fb.control('', [
        Validators.required,
        Validators.pattern(/^0[0-9]{10}$/g),
      ]),
      city: fb.control('', [Validators.required]),
      paymentMethod: fb.control('1'),
    });
  }

  get name() {
    return this.form.get('name');
  }

  get addressLine1() {
    return this.form.get('addressLine1');
  }

  get addressLine2() {
    return this.form.get('addressLine2');
  }

  get phone() {
    return this.form.get('phone');
  }

  get city() {
    return this.form.get('city');
  }

  get paymentMethod() {
    return this.form.get('paymentMethod');
  }

  async ngOnInit() {
    this.cartSubscription = (
      await this.shoppingCartService.getCart()
    ).subscribe((cart) => {
      this.cart = cart;
    });

    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user?.uid)
    );
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order({
      name: this.name?.value,
      addressLine1: this.addressLine1?.value,
      addressLine2: this.addressLine2?.value,
      city: this.city?.value,
      phone: this.phone?.value,
      paymentMethod: this.paymentMethod?.value,
      items: this.cart.items,
      userId: this.userId,
    });

    let orderKey = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', orderKey]);
  }
}
