import { VendaPlano } from './models/product-venda-plano.model';
import { Venda } from './models/product-venda.model';
import { Cliente } from './../client/client.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Plano } from './models/product-plano.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "/api";
  

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  

  cadVenda(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.baseUrl + "/venda" + "/inserir", venda)
  }

  cadVendaPlano(vendaPlano: VendaPlano): Observable<VendaPlano> {
    return this.http.post<VendaPlano>(this.baseUrl + "/venda" + "/inserir", vendaPlano)
  }

  buscarPlanos(): Observable<Plano[]> {
    return this.http.get<Plano[]>(this.baseUrl + "/plano" + "/listar")
  }

  buscarPlanoPorId(id: number): Observable<Plano> {
    const url = `${this.baseUrl}/plano/listarEsp?ids=${id}`
    return this.http.get<Plano>(url)
  }
}
