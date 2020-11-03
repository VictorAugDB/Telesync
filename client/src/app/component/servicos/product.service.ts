import { VendaPlano } from './models/product-venda-plano.model';
import { Venda } from './models/product-venda.model';
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
    return this.http.post<VendaPlano>(this.baseUrl + "/vendaPlano" + "/inserir", vendaPlano)
  }

  buscarPlanos(): Observable<Plano[]> {
    return this.http.get<Plano[]>(this.baseUrl + "/plano" + "/listar")
  }

  buscarPlanoPorId(id: number): Observable<Plano> {
    const url = `${this.baseUrl}/plano/listarEsp?ids=${id}`
    return this.http.get<Plano>(url)
  }

  deletarVenda(id: number): Observable<Venda> {
    const url = `${this.baseUrl}/venda/deletar?ids=${id}`
    return this.http.delete<Venda>(url)
  }

  buscarVendasCliente(id: number, isClientId: Boolean = true){
    const url = `${this.baseUrl}/venda/listarEsp?ids=${id}&isClientId=${isClientId}`
    return this.http.get<Venda[]>(url)
  }

  deletarVendaPlanos(id: Array<number>): Observable<VendaPlano> {
    let parametros = ''
    for(let i =0; i<id.length;i++){
      i == 0 ? parametros = `?ids=${id[i]}` : parametros += `&ids=${id[i]}`    
    }
    const url = `${this.baseUrl}/vendaPlano/deletar${parametros}`
    return this.http.delete<VendaPlano>(url)
  }

  altVenda(venda: Venda): Observable<Venda> {
    const url = `${this.baseUrl}/venda/alterar`
    return this.http.put<Venda>(url, venda)
  }
}
