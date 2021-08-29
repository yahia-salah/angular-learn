import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Order } from 'shared/models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit, OnDestroy, AfterViewInit {
  orders: Order[];
  ordersSubscription: Subscription;
  displayedColumns: string[] = [
    'id',
    'datePlaced',
    'totalPrice',
    'totalQuantity',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService) {}
  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.ordersSubscription = this.orderService
      .getOrders()
      .subscribe((orders) => {
        this.orders = orders;
        this.dataSource.data = this.orders;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data, filter) => {
      let order = data as Order;
      let totalPrice = order.TotalPrice;
      let totalQuantity = order.TotalQuantity;
      if (!Number.isNaN(filter) && totalPrice == Number.parseFloat(filter))
        return true;
      if (!Number.isNaN(filter) && totalQuantity == Number.parseInt(filter))
        return true;
      return false;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateOrderStatus(order: Order, status: string) {
    order.status = status;
    this.orderService.updateOrder(order);
  }

  completeOrder(order: Order) {
    this.updateOrderStatus(order, 'Complete');
  }

  cancelOrder(order: Order) {
    this.updateOrderStatus(order, 'Cancel');
  }
}
