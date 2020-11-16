import { AuthenticationService } from './../account/shared/authentication.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.authenticationService.getAuthorizationToken();
        let request: HttpRequest<any> = req;

        if (token) {
            // O request é imutavel, ou seja, não é possível mudar nada
            // Faço o clone para conseguir mudar as propriedades
            // Passo o token de autenticação no header
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        return next.handle(request)
            .pipe(
                catchError(this.handleError)
            )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // Errro de client-side ou de rede
            console.error('Ocorreu um erro: ', error.error.message);
        } else {
            console.error(
                `Código do erro ${error.status}, ` +
                `Erro: ${JSON.stringify(error.error)}`
            )
        }
        return throwError('Ocorreu um erro, tente novamente');
    }
}