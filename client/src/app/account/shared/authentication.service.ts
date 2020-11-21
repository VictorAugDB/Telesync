import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = "/api"

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Dados Incorretos, tente novamente.', true);
    return EMPTY;
  }


  async login(user: any){
    const result = await this.http.post<any>(`${this.baseUrl}/auth/autenticar`, user).pipe(map(obj => obj),
    catchError(e => this.errorHandler(e))
  ).toPromise();
    if(result && result.jwt){
      window.localStorage.setItem('token', result.jwt);
      return true;
    }
    return false;
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }

  recuperarSenha(username, resposta, novaSenha){
    return this.http.post(`${this.baseUrl}/auth/resetar-senha?username=${username}&resposta=${resposta}&novaSenha=${novaSenha}`, '1').pipe(map(obj => obj),
    catchError(e => this.errorHandler(e))
  );
  }

  getTokenExpirationDate(token: string): Date{
    const decoded: any = jwt_decode(token);
    
    if (decoded.exp === undefined){
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp)
    return date;
  }

  isTokenExpired(token?: string): boolean{
    if(!token){
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if(date == undefined){
      return false;
    }

    return !(date.valueOf() > new Date().valueOf()) 
  }

  isUserLoggedIn(){
    const token = this.getAuthorizationToken();
    if(!token){
      return false;
    } else if(this.isTokenExpired(token)){
      this.logoutUser();
      return false;
    }

    return true;
  }

  decodePayLoadJWT(): any{
    try {
      return jwt_decode(this.getAuthorizationToken())
    } catch(error){
      return null;
    }
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/events'])
  }
}
