import { Cliente } from './../../component/cliente/client.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = "/api"

  constructor(private http: HttpClient) {  }

  async login(user: any){
    const result = await this.http.post<any>(`${this.baseUrl}/auth`, user).toPromise();
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
      return false;
    }
    
    return true;
  }
}
