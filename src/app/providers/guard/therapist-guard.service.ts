import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { ToastPosition, ToastWrapper } from "src/app/util/ToastWrapper";
import { HttpResponseMessageSeverity } from "serious-game-library/dist/utils/http/HttpResponse";

import { AuthService } from "../auth.service";

@Injectable({
    providedIn: "root"
})
export class TherapistGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!this.authService.isTherapist()) {
            const message = new ToastWrapper(
                "Diese Funktion ist nur für TherapeutInnen vorgesehen.",
                ToastPosition.TOP,
                HttpResponseMessageSeverity.DANGER
            );
            message.alert();
            this.router.navigateByUrl("main-menu");
            return false;
        }
        return true;
    }
}
