import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";

import { HttpResponse } from "serious-game-library/dist/utils/http/HttpResponse";

@Component({
    selector: "serious-game-password-reset",
    styleUrls: ["./password-reset.page.scss"],
    templateUrl: "./password-reset.page.html"
})
export class PasswordResetPage implements OnInit, OnDestroy {
    public passwordResetForm: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(public router: Router, private authService: AuthService) {}

    public ngOnInit() {
        this.passwordResetForm = new FormGroup({
            email: new FormControl("", [Validators.email, Validators.required])
        });
    }

    /**
     * Fires if the password-reset button was clicked.
     */
    public onResetPassword(): void {
        this.subscription.add(
            this.authService
                .requestResetPassword(
                    this.passwordResetForm.controls.email.value
                )
                .subscribe((response) => {
                    const httpResponse = new HttpResponse().deserialize(
                        response
                    );
                    if (httpResponse.data.reset_code) {
                        const validUntil = httpResponse.data.reset_code.valid_until;
                        this.authService.setResetTokenValidUntil(validUntil);
                        this.router.navigateByUrl("/reset-password");
                    }
                })
        );
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
