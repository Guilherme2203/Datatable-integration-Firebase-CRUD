import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ServicesDataService } from 'src/app/services/services-data.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/product';
import { Router } from '@angular/router';
import { SelectionType } from './selection.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './list.component.scss',
    '../../../lib/material.scss',
    '../../../lib/bootstrap.scss',
  ],
})
export class ListComponent implements OnInit {
  rows: Observable<any>;

  selected = [];

  SelectionType = SelectionType;

  product: Product;
  key: string = '';

  columns = [
    { prop: 'code', name: 'Código'},
    { prop: 'name', name: 'Nome'},
    { prop: 'dropdown', name: 'Tipo'},
    { prop: 'value', name: 'Valor'},
    { prop: 'text', name: 'Texto'},
  ];

  constructor(
    private _servicesService: ServicesService,
    private _servicesDataService: ServicesDataService,
    private router: Router
  ) {}

  async ngOnInit() {
    (await this._servicesService.getAll()).subscribe((result) => {
      this.rows = result as any;
    });
  }

  delete(key: string) {
    console.log(key)
    this._servicesService.dalete(key);
  }

  edit(product: Product, key: string) {
    console.log(key);
    this._servicesDataService.obtemProduct(product, key);
    this.router.navigate(['edit']);
  }

  goToAddProduct() {
    this._servicesDataService.clear();
    this.router.navigate(['edit']);
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
}
