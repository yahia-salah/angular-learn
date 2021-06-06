import { AuthGuard } from "./auth-guard.service";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AdminAuthGuard extends AuthGuard {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuthenticated = super.canActivate(route, state);
    if (!isAuthenticated) return false;

    if (this.authService.currentUser.admin) return true;

    this.router.navigate(["/no-access"]);
    return false;
  }
}
