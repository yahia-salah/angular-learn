import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { ToastService } from './services/toast-service';
import { BaseService } from './services/base.service';
import { AppErrorHandler } from './common/errors/application-error-handler';
import { GenreService } from './services/genre.service';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from './courses.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

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
import { GenresComponent } from './genres/genres.component';
import { ToastsContainer } from './toasts-container/toasts-container.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';

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
    GenresComponent,
    GenreDetailComponent,
    ToastsContainer,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: SignupFormComponent },
      { path: 'passwordReset', component: PasswordResetComponent },
      { path: 'genres/:id', component: GenreDetailComponent },
      { path: 'genres', component: GenresComponent },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [
    CoursesService,
    BaseService,
    GenreService,
    ToastService,
    //{ provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
