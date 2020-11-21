import { AuthenticationService } from 'src/app/account/shared/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      const deCodeToken = this.authenticationService.decodePayLoadJWT()
      if (deCodeToken.isFuncionario && this.router.url !== '/login') {
        return true
      } else if (deCodeToken.codPermissao !== 2 && this.router.url === '/relatório-vendas') {
        this.router.navigate(['']);
        return false;
      } else {
        this.router.navigate(['']);
        return false;
      }
    } else {
      return true;
    }
  }
}
