import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ToastPosition, ToastWrapper } from "src/app/util/ToastWrapper";
import { HttpResponseMessageSeverity } from "serious-game-library/dist/utils/http/HttpResponse";

import { AuthService } from "../auth.service";

@Injectable({
    providedIn: "root"
})
export class PatientGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.authService.isTherapist()) {
            const message = new ToastWrapper(
                "Diese Funktion ist nur für PatientInnen vorgesehen.",
                ToastPosition.TOP,
                HttpResponseMessageSeverity.DANGER
            );
            this.router.navigateByUrl("main-menu");
            message.alert();
            return false;
        }
        return true;
    }
}
