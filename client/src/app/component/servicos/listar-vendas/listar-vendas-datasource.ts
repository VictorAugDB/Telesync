import { Cliente } from './../../cliente/client.model';
import { Venda } from './../models/product-venda.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ProductService } from '../product.service';
import { ClientService } from '../../cliente/client.service';

/**
 * Data source for the ListarVenda view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListarVendasDataSource extends DataSource<Venda> {
  cliente: Cliente = null;

  data: Venda[] = [{
      quantidadeChips: null,
      dtVenda: '',
      dtVencimento: '',
      valorTotal: null,
      obs: '',
      formaPagamento: '',
      status: null,
      cliente: this.cliente
  }]
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private productService: ProductService, private clientService: ClientService) {
    super();

    this.productService.buscarVendasCliente(1).subscribe(vendas => {
      this.data = vendas
    })

    const id = 1;
    this.clientService.buscarPorId(id).subscribe(cliente => {
      this.cliente = cliente.find(cliente => true)
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Venda[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];
    
    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Venda[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Venda[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'codVenda': return compare(a.codVenda, b.codVenda, isAsc);
        case 'dtVenda': return compare(+a.dtVenda, +b.dtVenda, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
