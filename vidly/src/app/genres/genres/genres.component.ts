import { SnackBarService } from './../../services/snack-bar.service';
import { GenreEntryComponent } from './../genre-entry/genre-entry.component';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationError } from '../../common/errors/authorization-error';
import { ForbiddenError } from '../../common/errors/forbidden-error';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { AppError } from '../../common/errors/application-error';
import { Genre, GenreService } from '../../services/genre.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Genre>(this.genres);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: GenreService,
    public toastService: ToastService,
    private _snackBar: SnackBarService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource=new MatTableDataSource(this.genres);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      console.log(params.get('sort'));

      this.service.getAll().subscribe(
        (genre: Genre[]) => {
          this.genres = genre;
          this.dataSource.data=this.genres;
        },
        (error: AppError) => this.errorHandler(error),
        () => this.showSuccess()
      );
    });
  }

  createGenre() {
    let newGenre: Genre = {
      name: '',
      _id: '',
    };

    let dialogRef = this.dialog.open(GenreEntryComponent, {
      data: newGenre,
      minWidth: '50%',
    });
    dialogRef.componentInstance.title = 'Create New Genre';

    this.genres.splice(0, 0, newGenre as Genre);

    dialogRef.afterClosed().subscribe((result) => {
      if (result as Genre) {
        this.service.create(newGenre).subscribe(
          (genre: Genre) => {
            console.log(genre);
            this.genres[0] = genre;
          },
          (error: AppError) => {
            this.genres.splice(0, 1);

            this.errorHandler(error);
          },
          () => {
            this.dataSource._updateChangeSubscription();
            this.showSuccess();
          }
        );
      } else this.genres.splice(0, 1);
    });
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
      () => {
        this.dataSource._updateChangeSubscription();
        this.showSuccess();
      }
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
    this.openSnackBar('I am a standard snackbar');
  }

  showSuccess() {
    // this.toastService.show('Operation Successful!', {
    //   classname: 'bg-success text-light',
    //   delay: 5000,
    // });
    this.openSnackBar('Operation Successful!', ['success']);
  }

  showDanger(dangerTpl: string) {
    // this.toastService.show(dangerTpl, {
    //   classname: 'bg-danger text-light',
    //   delay: 5000,
    // });
    this.openSnackBar(dangerTpl, ['failure']);
  }

  openSnackBar(message: string, classesNames?: string[]) {
    // this._snackBar.show(message, classesNames);
  }

  editGenre(genre: Genre) {
    let oldGenre = _.cloneDeep(genre);
    let dialogRef = this.dialog.open(GenreEntryComponent, {
      data: genre,
      minWidth: '50%',
    });
    dialogRef.componentInstance.title = 'Edit Genre';

    dialogRef.afterClosed().subscribe((result) => {
      if (result as Genre) {
        let index = this.genres.indexOf(genre);
        this.genres[index] = result;
        this.service.update(genre).subscribe(
          (updatedGenre: Genre) => {
            let index = this.genres.indexOf(genre);
            this.genres[index] = updatedGenre;
          },
          (error: AppError) => {
            this.genres[index] = oldGenre;

            this.errorHandler(error);
          },
          () => {
            this.dataSource._updateChangeSubscription();
            this.showSuccess();
          }
        );
      }
    });
  }
}
