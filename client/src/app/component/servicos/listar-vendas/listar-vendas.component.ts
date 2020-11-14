import { Cliente } from './../../cliente/client.model';
import { ProductService } from './../product.service';
import { Venda } from './../models/product-venda.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListarVendasDataSource } from './listar-vendas-datasource';
import { ClientService } from '../../cliente/client.service';
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css']
})
export class ListarVendasComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Venda>;
  dataSource = new MatTableDataSource();

  cliente: Cliente = null;

  vendas: Venda[] = [{
    quantidadeChips: null,
    dtVenda: '',
    dtVencimento: '',
    valorTotal: null,
    obs: 'a',
    formaPagamento: '',
    statusPagamento: null,
    cliente: this.cliente
  }]

  //dataSource: ListarVendasDataSource = null;

  constructor(private productService: ProductService, private clientService: ClientService, private route: ActivatedRoute) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codVenda', 'quantidadeChips', 'dtVenda', 'dtVencimento', 'valorTotal', 'formaPagamento', 'statusPagamento', 'action', 'edit'];

  ngOnInit() {
    
    const id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.productService.buscarVendasCliente(id).subscribe(vendas => {
      this.vendas = vendas;
      this.dataSource = new MatTableDataSource(vendas)
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource = this.dataSource;
    }, 500)
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
