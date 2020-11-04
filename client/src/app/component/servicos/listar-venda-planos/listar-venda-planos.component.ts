import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListarVendaPlanosDataSource, ListarVendaPlanosItem } from './listar-venda-planos-datasource';

@Component({
  selector: 'app-listar-venda-planos',
  templateUrl: './listar-venda-planos.component.html',
  styleUrls: ['./listar-venda-planos.component.css']
})
export class ListarVendaPlanosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ListarVendaPlanosItem>;
  dataSource: ListarVendaPlanosDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ListarVendaPlanosDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
