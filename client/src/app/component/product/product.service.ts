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

  baseUrl = "http://localhost:8080";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  cadastrar(plano: Plano): Observable<Plano>{
    return this.http.post<Plano>(this.baseUrl + "/inserir", plano)
  }

  buscarPorId(id: number): Observable<Cliente>{
    const url = `${this.baseUrl}/listarDef/${id}`
    return this.http.get<Cliente>(url)
  }
}
