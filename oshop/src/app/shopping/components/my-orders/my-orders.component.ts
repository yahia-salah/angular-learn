import { AuthService } from 'shared/services/auth.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Order } from 'shared/models/order.model';
import { OrderService } from 'shared/services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  orders: Order[];
  userId?: string;
  userSubscription: Subscription;
  ordersSubscription: Subscription;
  displayedColumns: string[] = [
    'id',
    'datePlaced',
    'totalPrice',
    'totalQuantity',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.userId = user?.uid;
      this.ordersSubscription = this.orderService
        .getOrdersByUser(this.userId || '')
        .subscribe((orders) => {
          this.orders = orders;
          this.dataSource.data = this.orders;
        });
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
}
