import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private location: Location, private auth: BackendService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        if (this.auth.authenticateValidator() == true) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}




