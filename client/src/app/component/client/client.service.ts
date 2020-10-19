import { Cliente } from './client.model';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = "http://localhost:8080/cliente"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  cadastrar(cliente: Cliente): Observable<Cliente>{
    let newDate: moment.Moment = moment.utc(cliente.dtNascCliente).local();
    cliente.dtNascCliente = newDate.format("YYYY-MM-DD");
    return this.http.post<Cliente>(this.baseUrl + "/inserir", cliente)
  }

  buscar(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseUrl + "/listar")
  }
}
