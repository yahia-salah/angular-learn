import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  getCourses(): { name: string }[] {
    return [{ name: 'course1' }, { name: 'course2' }, { name: 'course3' }];
  }

  constructor() {}
}
