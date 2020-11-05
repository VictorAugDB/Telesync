import { VendaPlano } from './../models/product-venda-plano.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListarVendaPlanosDataSource } from './listar-venda-planos-datasource';

@Component({
  selector: 'app-listar-venda-planos',
  templateUrl: './listar-venda-planos.component.html',
  styleUrls: ['./listar-venda-planos.component.css']
})
export class ListarVendaPlanosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<VendaPlano>;
  dataSource: ListarVendaPlanosDataSource;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codVendaPlano', 'numeroTelefone', 'ddd', 'imei', 'nomePlano', 'valorPlano', 'cicloDias', 'tipoPlano'];

  ngOnInit() {
    this.dataSource = new ListarVendaPlanosDataSource(this.productService, this.route);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, 500)
  }
}
