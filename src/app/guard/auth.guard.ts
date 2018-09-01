import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginService} from '../services/login.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';

@Injectable()
export class NeoAuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

    if (this.loginService.isLogged()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        [''], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
}
