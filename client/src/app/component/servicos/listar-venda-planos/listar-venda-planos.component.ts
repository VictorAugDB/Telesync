import { AuthenticationService } from './../../../account/shared/authentication.service';
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
  deCodeToken = this.authenticationService.decodePayLoadJWT();

  constructor(private productService: ProductService, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [];

  ngOnInit() {
    this.displayedColumnsByPermission()

    this.dataSource = new ListarVendaPlanosDataSource(this.productService, this.route);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, 600)
  }

  displayedColumnsByPermission() {
    if (this.deCodeToken.isFuncionario) {
      this.displayedColumns = ['codVendaPlano', 'numeroTelefone', 'ddd', 'imei', 'status', 'nomePlano', 'valorPlano', 'cicloDias', 'tipoPlano', 'edit', 'cancel'];
    } else {
      this.displayedColumns = ['numeroTelefone', 'ddd', 'imei', 'status', 'nomePlano', 'valorPlano', 'cicloDias', 'tipoPlano', 'cancel'];
    }
  }

  verificaStatus(row) {
    if (row == true) {
      return 'Ativo'
    } else {
      return 'Cancelado'
    }
  }

  cancelarPlano(row) {
    if (this.deCodeToken.isFuncionario) {
      if (row.status == true) {
        row.status = false;
        this.productService.altVendaPlano(row).subscribe(() => {
          this.productService.showMessage('Venda Cancelada!')
        })
      } else {
        alert('Plano já está cancelado!')
      }
    } else {
      let cont = 0;
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i].active == true)
          cont++
      }
      if (cont > 1) {
        if (row.status == true) {
          row.status = false;
          this.productService.altVendaPlano(row).subscribe(() => {
            this.productService.showMessage('Venda Cancelada!')
          })
        } else {
          alert('Plano já está cancelado!')
        }
      } else {
        alert('Favor entrar em contato com algum de nossos funcionários em algum ponto de venda ou via telefone.')
      }
    }
  }
}
