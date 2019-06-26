import {Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Injectable()

export class AdminGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authService.isStateAdmin() && this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }

}
