import { FormsModule } from '@angular/forms';
import { CoursesService } from './courses.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { StarComponent } from './star/star.component';
import { TitlecaseComponent } from './titlecase/titlecase.component';
import { TitleCaseOfThePipe } from './title-case-of-the.pipe';
import { PanelComponent } from './panel/panel.component';
import { LikeComponent } from './like/like.component';

@NgModule({
  declarations: [AppComponent, CourseComponent, CoursesComponent, StarComponent, TitlecaseComponent, TitleCaseOfThePipe, PanelComponent, LikeComponent],
  imports: [BrowserModule, FormsModule],
  providers: [CoursesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
