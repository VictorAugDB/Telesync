import { Cliente } from './client.model';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = '/api/cliente'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
  cadastrar(cliente: Cliente): Observable<Cliente>{
    let newDate: moment.Moment = moment.utc(cliente.dtNascCliente).local();
    cliente.dtNascCliente = newDate.format("YYYY-MM-DD");
    return this.http.post<Cliente>(this.baseUrl + "/inserir", cliente, {responseType: 'text' as 'json'})
  }

  buscar(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseUrl + "/listar")
  }

  buscarPorId(id: number): Observable<Cliente[]>{
    const url = `${this.baseUrl}/listarEsp?ids=${id}`
    return this.http.get<Cliente[]>(url)
  }

  altDadosCliente(cliente: Cliente): Observable<Cliente>{
    const url = `${this.baseUrl}/alterar`
    return this.http.put<Cliente>(url, cliente, {responseType: 'text' as 'json'})
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
