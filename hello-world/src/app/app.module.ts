import { SignupFormComponent } from './signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from './courses.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { StarComponent } from './star/star.component';
import { TitlecaseComponent } from './titlecase/titlecase.component';
import { TitleCaseOfThePipe } from './title-case-of-the.pipe';
import { PanelComponent } from './panel/panel.component';
import { LikeComponent } from './like/like.component';
import { AmericanPhoneNumberFormatDirective } from './american-phone-number-format.directive';
import { ZippyComponent } from './zippy/zippy.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CoursesComponent,
    StarComponent,
    TitlecaseComponent,
    TitleCaseOfThePipe,
    PanelComponent,
    LikeComponent,
    AmericanPhoneNumberFormatDirective,
    ZippyComponent,
    ContactFormComponent,
    SignupFormComponent,
    PasswordResetComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule],
  providers: [CoursesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
