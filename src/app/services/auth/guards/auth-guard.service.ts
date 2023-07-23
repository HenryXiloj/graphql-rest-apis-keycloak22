import { Injectable, inject } from "@angular/core";
import {
  Router,
} from "@angular/router";

import { AuthService } from "../login/auth.service";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(
    public router: Router,
    public rt: ActivatedRoute,
    private authService: AuthService,
  ) { }

  isAuth(isAuth: boolean) {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}

export const canActivate = (isAuth: boolean, authGuardService = inject(AuthGuardService)) => authGuardService.isAuth(true);

