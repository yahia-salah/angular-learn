import { Product } from 'shared/models/product.model';
import { ProductFormComponent } from 'app/admin/components/product-form/product-form.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'shared/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit, AfterViewInit {
  products: Product[];
  displayedColumns: string[] = ['id', 'title', 'price', 'edit'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.dataSource.data = this.products;
    });
  }

  addNewProduct() {
    let newProduct: Product = {
      title: '',
      price: 0,
      category: '',
      imageUrl: '',
    };

    let dialogRef = this.dialog.open(ProductFormComponent, {
      data: newProduct,
      minWidth: '75%',
      maxHeight: '100vh',
    });

    dialogRef.componentInstance.title = 'New Product';
    dialogRef.componentInstance.hideDelete = true;

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result != 'cancel' && (result as Product)) {
          this.productService.createProduct(result);
        }
      },
      (error) => {},
      () => this.dataSource._updateChangeSubscription()
    );
  }

  editProduct(product: Product) {
    let editProduct = _.cloneDeep(product);

    let dialogRef = this.dialog.open(ProductFormComponent, {
      data: editProduct,
      minWidth: '75%',
      maxHeight: '100vh',
    });

    dialogRef.componentInstance.title = 'Edit/Delete Product';
    dialogRef.componentInstance.hideDelete = false;

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result != 'cancel' && result != 'delete' && (result as Product)) {
          this.productService.updateProduct(result);
          let index = this.products.indexOf(product);
          this.products[index] = result as Product;
        } else if (result == 'delete') {
          if (product.id) this.productService.delete(product.id);
        }
      },
      (error) => {},
      () => this.dataSource._updateChangeSubscription()
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data, filter) => {
      let product = data as Product;
      if (
        filter.trim() != '' &&
        product.title.toLowerCase().includes(filter.toLowerCase().trim())
      )
        return true;
      return false;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
