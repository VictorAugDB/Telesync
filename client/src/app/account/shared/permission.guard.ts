import { AuthenticationService } from 'src/app/account/shared/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const deCodeToken = this.authenticationService.decodePayLoadJWT()
    if (deCodeToken.isFuncionario) {
      return true
    }else {
      this.router.navigate(['']);
      return false;
    }
  }

}
