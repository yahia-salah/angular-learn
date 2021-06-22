import {
  Movie,
  MoviesService,
  MoviesThumbnailUploadService,
} from './../../services/movies.service';
import { MovieEntryComponent } from './../movie-entry/movie-entry.component';
import { SnackBarService } from './../../services/snack-bar.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { switchMap, mergeMap, tap, concatMap, map } from 'rxjs/operators';
import { defer, iif, Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private service: MoviesService,
    private thumbnailUploadService: MoviesThumbnailUploadService,
    private _snackBar: SnackBarService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (movies: Movie[]) => (this.movies = movies),
      (error) => {}
    );
  }

  createMovie() {
    let newMovie: Movie = {
      title: '',
      _id: '',
      dailyRentalRate: 0,
      numberInStock: 0,
      genre: {
        _id: '',
        name: '',
      },
      thumbnail: '',
    };

    let dialogRef = this.dialog.open(MovieEntryComponent, {
      data: { movie: newMovie, thumbnail: null },
      minWidth: '50%',
    });
    dialogRef.componentInstance.title = 'Create New Movie';

    this.movies.splice(0, 0, newMovie as Movie);

    dialogRef
      .afterClosed()
      .subscribe((result: { movie: Movie; thumbnail: FormData }) => {
        if (result) {
          this.service.create(newMovie).subscribe(
            (movie: Movie) => {
              console.log(movie);
              this.movies[0] = movie;
              if (result.thumbnail) {
                this.thumbnailUploadService
                  .update(result.thumbnail, movie._id)
                  .subscribe((movie: Movie) => {
                    if (movie) {
                      this.movies[0].thumbnail = movie.thumbnail;
                    }
                  });
              }
            },
            (error) => {
              this.movies.splice(0, 1);
            }
          );
        } else this.movies.splice(0, 1);
      });
  }

  deleteMovie(movie: Movie) {
    let index = this.movies.indexOf(movie);
    this.movies.splice(index, 1);

    this.service.delete(movie._id).subscribe(
      (deletedMovie: Movie) => {
        console.log(deletedMovie);
      },
      (error) => {
        this.movies.splice(index, 0, movie);
      }
    );
  }

  editMovie(movie: Movie) {
    let oldMovie = _.cloneDeep(movie);
    let index = this.movies.indexOf(movie);
    let dialogRef = this.dialog.open(MovieEntryComponent, {
      data: { movie, thumbnail: null },
      minWidth: '50%',
    });
    dialogRef.componentInstance.title = 'Edit Movie';

    dialogRef
      .afterClosed()
      .subscribe((result: { movie: Movie; thumbnail: FormData }) => {
        if (result) {
          this.service
            .update(result.movie)
            .pipe(tap((response) => console.log('Update Movie', response)))
            .subscribe(
              (updatedMovie: Movie) => {
                this.movies[index] = updatedMovie;

                if (result.thumbnail) {
                  this.thumbnailUploadService
                    .update(result.thumbnail, updatedMovie._id)
                    .subscribe((movie: Movie) => {
                      if (movie) {
                        this.movies[index].thumbnail = movie.thumbnail;
                      }
                    });
                }
              },
              (error) => {
                this.movies[index] = oldMovie;
              }
            );
        }
      });
  }
}
