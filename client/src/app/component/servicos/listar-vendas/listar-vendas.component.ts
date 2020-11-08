import { ProductService } from './../product.service';
import { Venda } from './../models/product-venda.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListarVendasDataSource } from './listar-vendas-datasource';
import { ClientService } from '../../cliente/client.service';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css']
})
export class ListarVendasComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Venda>;
  dataSource: ListarVendasDataSource = null;

  constructor(private productService: ProductService, private clientService: ClientService) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codVenda', 'quantidadeChips', 'dtVenda', 'dtVencimento', 'valorTotal', 'formaPagamento', 'statusPagamento', 'action'];

  ngOnInit() {
    this.dataSource = new ListarVendasDataSource(this.productService, this.clientService);
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.table.dataSource = this.dataSource;
    }, 500)
  }
}
