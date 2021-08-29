import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  orderId: string;

  constructor(route: ActivatedRoute) {
    this.orderId = route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {}
}
