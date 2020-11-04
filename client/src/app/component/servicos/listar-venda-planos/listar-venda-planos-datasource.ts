import { Plano } from './../models/product-plano.model';
import { Venda } from './../models/product-venda.model';
import { VendaPlano } from './../models/product-venda-plano.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

/**
 * Data source for the ListarVendaPlanos view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListarVendaPlanosDataSource extends DataSource<VendaPlano> {

  venda: Venda = null;
  plano: Plano = null;
  
  data: VendaPlano[] = [
    {
      numeroTelefone: null,
      ddd: '',
      imei: null,
      venda: this.venda,
      plano: this.plano
    }];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    super();
  
    const id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.productService.buscarVendaCliente(id).subscribe(venda => {
      this.venda = venda;
    })

    this.productService.buscarPlanoPorId(1).subscribe(plano => {
      this.plano = plano
    });

    setTimeout(() =>{
      this.productService.buscarVendaPlanosVendaCliente(id).subscribe(vendaPlanos => {
        this.data = vendaPlanos
      })
    }, 300)

    /*setTimeout(() =>{

    }, 300)
    
    setTimeout(() =>{

    }, 300)*/
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<VendaPlano[]> {
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
  private getPagedData(data: VendaPlano[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: VendaPlano[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.codVendaPlano, b.codVendaPlano, isAsc);
        case 'id': return compare(+a.numeroTelefone, +b.imei, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
