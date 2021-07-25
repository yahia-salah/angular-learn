import { Employee } from './../../models/employee.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as employeeActions from './../actions/employee.actions';

export const INITIALSTATE: ReadonlyArray<Employee> = [
  { id: '12345', name: 'Yahia Salah', salary: 100000 },
];

export const employeesReducer = createReducer(
  INITIALSTATE,
  on(employeeActions.addEmployee, (state, payload) => {
    if (state.find((e) => e.id === payload.id)) return state;
    return [...state, payload];
  }),
  on(employeeActions.removeEmployee, (state, payload) => {
    return state.filter((e) => e.id !== payload.id);
  })
);
