import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'shared/services/category.service';
import { AuthService } from 'shared/services/auth.service';
import { UserInfo } from 'shared/models/user.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'shared/models/cart.model';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: UserInfo | null;
  categories$;
  currentCategory: string = '';
  cart$: Observable<Cart>;
  leafIcon = faLeaf;

  constructor(
    private auth: AuthService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    this.auth.getUserDB$().subscribe((user) => (this.user = user));
    this.categories$ = categoryService.getAll();
    this.route.queryParamMap.subscribe((params) => {
      let category = params.get('category');
      if (category) this.currentCategory = category;
    });
  }
  ngOnDestroy(): void {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
    this.user = null;
  }

  selectCategory(category: string) {
    this.currentCategory = category;
  }
}
