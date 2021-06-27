import { Genre, GenreService } from './../../services/genre.service';
import { Movie } from './../../services/movies.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileSelectedEventArgs } from 'src/app/file-upload/file-upload.component';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-movie-entry',
  templateUrl: './movie-entry.component.html',
  styleUrls: ['./movie-entry.component.css'],
})
export class MovieEntryComponent implements OnInit {
  @Input() title: string = 'Title';
  form: FormGroup;
  genres: Genre[] = [];
  file: File;
  imageSrc: string = '';
  dir: Direction;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { movie: Movie; thumbnail: FormData },
    private fb: FormBuilder,
    private genreService: GenreService
  ) {
    this.form = fb.group({
      id: fb.control({
        value: data.movie._id,
        disabled: true,
      }),
      title: fb.control(data.movie.title, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      numberInStock: fb.control(data.movie.numberInStock, [
        Validators.required,
        Validators.min(0),
        Validators.max(255),
      ]),
      dailyRentalRate: fb.control(data.movie.dailyRentalRate, [
        Validators.required,
        Validators.min(0),
        Validators.max(255),
      ]),
      genre: fb.control(data.movie.genre._id, [Validators.required]),
    });

    if (data.movie?.thumbnail) this.imageSrc = data.movie.thumbnail;

    this.dir = document.documentElement.dir as Direction;
  }

  get movTitle() {
    return this.form.get('title');
  }

  get numberInStock() {
    return this.form.get('numberInStock');
  }

  get dailyRentalRate() {
    return this.form.get('dailyRentalRate');
  }

  get genre() {
    return this.form.get('genre');
  }

  ngOnInit(): void {
    this.genreService.getAll().subscribe((genres) => {
      this.genres = genres;
    });
  }

  save() {
    this.data.movie.title = this.movTitle?.value as string;
    this.data.movie.numberInStock = this.numberInStock?.value as number;
    this.data.movie.dailyRentalRate = this.dailyRentalRate?.value as number;
    this.data.movie.genre = this.genres?.find(
      (g) => g._id == this.genre?.value
    ) as Genre;
    if (this.file) {
      this.data.movie.thumbnail = '';
      this.data.thumbnail = new FormData();
      this.data.thumbnail.append('thumbnail', this.file);
    }
  }

  onFileSelected($event: FileSelectedEventArgs) {
    this.file = $event.file;
    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = reader.result as string);
    reader.readAsDataURL(this.file);
  }
}
