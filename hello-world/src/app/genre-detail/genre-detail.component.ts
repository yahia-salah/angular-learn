import { Genre } from './../services/genre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GenreService } from '../services/genre.service';
import { AppError } from '../common/errors/application-error';
import { ToastService } from '../services/toast-service';
import { BadRequestError } from '../common/errors/bad-request-error';
import { ForbiddenError } from '../common/errors/forbidden-error';
import { AuthorizationError } from '../common/errors/authorization-error';

@Component({
  selector: 'genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.css'],
})
export class GenreDetailComponent implements OnInit {
  genre: Genre = { _id: '', name: '' };
  constructor(
    private route: ActivatedRoute,
    private service: GenreService,
    public toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.service.getOne(params.get('id') ?? '0').subscribe(
        (genre) => {
          if (genre) {
            this.genre = genre;
          }
        },
        (error: AppError) => this.errorHandler(error),
        () => this.showSuccess()
      );
    });
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

  onBack() {
    this.router.navigate(['/genres'], {
      queryParams: {
        sort: 'up',
      },
    });
  }
}
