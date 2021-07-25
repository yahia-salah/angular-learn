import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Employee } from './../models/employee.model';
import { AppState } from './../state/app.state';
import * as EmployeeActions from './../state/actions/employee.actions';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  $employees: Observable<ReadonlyArray<Employee>>;

  constructor(private store: Store<AppState>) {
    this.$employees = store.select('employees');
  }

  ngOnInit(): void {}

  deleteEmployee(employee: Employee) {
    this.store.dispatch(EmployeeActions.removeEmployee(employee));
  }
}
