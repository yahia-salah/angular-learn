import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  twoWayBindingText = 'Enter some text';
  title = 'Courses List';
  courses;
  imageUrl = 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg';
  constructor(service: CoursesService) {
    this.courses = service.getCourses();
  }

  ngOnInit(): void {}

  getTitle() {
    return this.title;
  }

  onCancel($event: any) {
    $event.stopPropagation();
    console.log('Button was clicked', $event);
  }

  onDivClicked() {
    console.log('Div was clicked');
  }

  onKeyUpEnter(text?: string) {
    if (text != undefined)
      console.log(`User typed '${text}' then pressed ENTER`);
    else console.log(`Two Way Binding Text is ${this.twoWayBindingText}`);
  }
}
