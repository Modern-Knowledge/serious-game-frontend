import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";

import { environment } from "../../../environments/environment";

@Component({
    selector: "serious-game-reset-password",
    styleUrls: ["./reset-password.page.scss"],
    templateUrl: "./reset-password.page.html"
})
export class ResetPasswordPage implements OnInit, OnDestroy {
    public resetPasswordForm: FormGroup;
    private subscription: Subscription = new Subscription();

    /**
     * @param router application router
     * @param authService authentication service
     */
    constructor(public router: Router, private authService: AuthService) {}

    /**
     * initiates the form when, the component mounted.
     */
    public ngOnInit() {
        this.resetPasswordForm = new FormGroup(
            {
                email: new FormControl("", [
                    Validators.email,
                    Validators.required
                ]),
                password: new FormControl("", [
                    Validators.minLength(environment.passwordLength),
                    Validators.required
                ]),
                password_confirmation: new FormControl("", [
                    Validators.minLength(environment.passwordLength),
                    Validators.required
                ]),
                token: new FormControl("", [
                    Validators.maxLength(environment.tokenLength),
                    Validators.minLength(environment.tokenLength),
                    Validators.required
                ])
            },
            this.PasswordMatchValidator
        );
    }

    /**
     * Fires if the password-reset button was clicked.
     */
    public onResetPassword(): void {
        this.subscription.add(
            this.authService
                .resetPassword(
                    this.resetPasswordForm.controls.email.value,
                    this.resetPasswordForm.controls.password.value,
                    this.resetPasswordForm.controls.password_confirmation.value,
                    this.resetPasswordForm.controls.token.value
                )
                .subscribe((response) => {
                    this.router.navigateByUrl("/login");
                })
        );
    }

    public PasswordMatchValidator(form): ValidatorFn {
        if (form.get("password") === form.get("password_confirmation")) {
            return form.get("password").setErrors({ password_mismatch: true });
        }
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
