import { Product } from 'shared/models/product.model';
import { CategoryService } from 'shared/services/category.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Input() title = '';
  @Input() hideDelete = false;
  form: FormGroup;
  categories$;

  get Title() {
    return this.form.get('title');
  }

  get Price() {
    return this.form.get('price');
  }

  get Category() {
    return this.form.get('category');
  }

  get ImageUrl() {
    return this.form.get('imageUrl');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categories$ = categoryService.getAll();

    this.form = fb.group({
      title: fb.control(data.title, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      price: fb.control(data.price, [Validators.required, Validators.min(0)]),
      category: fb.control(data.category, [Validators.required]),
      imageUrl: fb.control(data.imageUrl, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  save() {
    this.data.title = this.Title?.value as string;
    this.data.price = this.Price?.value as number;
    this.data.category = this.Category?.value as string;
    this.data.imageUrl = this.ImageUrl?.value as string;
  }
}
