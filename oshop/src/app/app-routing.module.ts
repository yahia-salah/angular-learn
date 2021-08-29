import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { LoginComponent } from './core/components/login/login.component';
import { ManageProductsComponent } from './admin/components/manage-products/manage-products.component';
import { ManageOrdersComponent } from './admin/components/manage-orders/manage-orders.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from 'app/shopping/components/products/products.component';
import { HomeComponent } from './core/components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/orders',
    component: ManageOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products',
    component: ManageProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
