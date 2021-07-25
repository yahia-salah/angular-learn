import { Employee } from '../models/employee.model';

export interface AppState {
  employees: ReadonlyArray<Employee>;
}
