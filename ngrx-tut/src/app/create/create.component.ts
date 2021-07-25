import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../state/app.state';
import { Employee } from './../models/employee.model';
import * as EmployeeActions from './../state/actions/employee.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  addEmployee(id: string, name: string, salary: string) {
    this.store.dispatch(
      EmployeeActions.addEmployee({ id, name, salary: Number(salary) })
    );
  }
}
