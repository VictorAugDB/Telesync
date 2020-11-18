import { Cliente } from './../../cliente/client.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListarClientesDataSource, ListarClientesItem } from './listar-clientes-datasource';
import { MatTableDataSource } from '@angular/material/table'
import { ClientService } from '../../cliente/client.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ListarClientesItem>;
  dataSource = new MatTableDataSource();

  cliente: Cliente[] = null

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codCliente', 'cpfCliente', 'nomeCliente', 'dtNascCliente', 'sexoCliente', 'estadoCivilCliente', 'nomeMaeCliente', 'liberacaoCredito', 'dtCadastroCliente', 'edit'];

  constructor(private clientService: ClientService) { }

  ngOnInit() {

    this.clientService.buscar().subscribe(clientes => {
      this.cliente = clientes
      this.dataSource = new MatTableDataSource(clientes)
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource = this.dataSource;
    }, 500)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
