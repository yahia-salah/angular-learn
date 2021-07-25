import { Employee } from './../../models/employee.model';
import { createAction, props } from '@ngrx/store';

export const addEmployee = createAction(
  '[Employee List] Add Employee',
  props<Employee>()
);

export const removeEmployee = createAction(
  '[Employee List] Remove Employee',
  props<Employee>()
);
