import { ActivatedRoute } from '@angular/router';
import { AuthorizationError } from './../common/errors/authorization-error';
import { ForbiddenError } from '../common/errors/forbidden-error';
import { BadRequestError } from '../common/errors/bad-request-error';
import { AppError } from './../common/errors/application-error';
import { Genre, GenreService } from './../services/genre.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast-service';

@Component({
  selector: 'genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  constructor(
    private service: GenreService,
    public toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      console.log(params.get('sort'));

      this.service.getAll().subscribe(
        (genre: Genre[]) => (this.genres = genre),
        (error: AppError) => this.errorHandler(error),
        () => this.showSuccess()
      );
    });
  }

  createGenre(input: HTMLInputElement) {
    let newGenre: Genre = {
      name: input.value,
      _id: '',
    };
    this.genres.splice(0, 0, newGenre as Genre);

    input.value = '';

    this.service.create(newGenre).subscribe(
      (genre: Genre) => {
        console.log(genre);
        this.genres[0] = genre;
      },
      (error: AppError) => {
        this.genres.splice(0, 1);

        this.errorHandler(error);
      },
      () => this.showSuccess()
    );
  }

  updateGenre(genre: Genre) {
    let oldName = genre.name;
    genre.name += '_updated';
    this.service.update(genre).subscribe(
      (updatedGenre: Genre) => {
        console.log(updatedGenre);
        let index = this.genres.indexOf(genre);
        this.genres[index] = updatedGenre;
      },
      (error: AppError) => {
        genre.name = oldName;

        this.errorHandler(error);
      },
      () => this.showSuccess()
    );
  }

  deleteGenre(genre: Genre) {
    let index = this.genres.indexOf(genre);
    this.genres.splice(index, 1);

    this.service.delete(genre._id).subscribe(
      (deletedGenre: Genre) => {
        console.log(deletedGenre);
      },
      (error: AppError) => {
        this.genres.splice(index, 0, genre);

        this.errorHandler(error);
      },
      () => this.showSuccess()
    );
  }

  errorHandler(error: AppError) {
    if (error instanceof BadRequestError)
      this.showDanger('Bad request error: ' + error.originalError);
    else if (error instanceof ForbiddenError)
      this.showDanger('Forbidden error: ' + error.originalError);
    else if (error instanceof AuthorizationError)
      this.showDanger('Authorization error: ' + error.originalError);
    else {
      this.showDanger('General error: ' + JSON.stringify(error));
      //throw error;
    }
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('Operation Successful!', {
      classname: 'bg-success text-light',
      delay: 5000,
    });
  }

  showDanger(dangerTpl: string) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 5000,
    });
  }
}
