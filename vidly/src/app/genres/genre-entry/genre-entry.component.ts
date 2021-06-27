import { Genre } from './../../services/genre.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-genre-entry',
  templateUrl: './genre-entry.component.html',
  styleUrls: ['./genre-entry.component.css'],
})
export class GenreEntryComponent implements OnInit {
  form: FormGroup;
  dir: Direction;
  @Input() title: string = 'Title';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Genre,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      id: fb.control({
        value: data._id,
        disabled: true,
      }),
      name: fb.control(data.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
    });
    this.dir = document.documentElement.dir as Direction;
  }

  get name() {
    return this.form.get('name');
  }

  ngOnInit(): void {}

  save() {
    this.data.name = this.form.get('name')?.value as string;
  }
}
