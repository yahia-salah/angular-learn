import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    ProductFormComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
  ],
  imports: [SharedModule],
  providers: [AdminAuthGuard],
})
export class AdminModule {}
