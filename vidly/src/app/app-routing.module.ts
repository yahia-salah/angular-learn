import { AuthGuard } from './services/auth-guard.service';
import { GenreDetailComponent } from './genres/genre-detail/genre-detail.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './login/signup/signup.component';
import { LoginComponent } from './login/login/login.component';
import { GenresComponent } from './genres/genres/genres.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies/movies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'genres/:id',
    component: GenreDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'genres', component: GenresComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'no-access', component: NoAccessComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
