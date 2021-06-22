import {
  MoviesService,
  MoviesThumbnailUploadService,
} from './services/movies.service';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { SnackBarService } from './services/snack-bar.service';
import { SpinnerInterceptor } from './services/spinner.interceptor';
import { MaterialModule } from './material.module';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ToastsContainer } from './toasts-container/toasts-container.component';
import { ToastService } from './services/toast-service';
import { GenreService } from './services/genre.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { GenreDetailComponent } from './genres/genre-detail/genre-detail.component';
import { GenresComponent } from './genres/genres/genres.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutofocusDirective } from './common/directives/autofocus.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { SpinnerOverlayService } from './spinner-overlay/spinner-overlay.service';
import { GenreEntryComponent } from './genres/genre-entry/genre-entry.component';
import { MoviesComponent } from './movies/movies/movies.component';
import { MovieEntryComponent } from './movies/movie-entry/movie-entry.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    GenresComponent,
    GenreDetailComponent,
    NotFoundComponent,
    ToastsContainer,
    HomeComponent,
    NoAccessComponent,
    AutofocusDirective,
    SpinnerComponent,
    SpinnerOverlayComponent,
    GenreEntryComponent,
    CustomSnackBarComponent,
    MoviesComponent,
    MovieEntryComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    GenreService,
    MoviesService,
    MoviesThumbnailUploadService,
    ToastService,
    SnackBarService,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    SpinnerOverlayService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
