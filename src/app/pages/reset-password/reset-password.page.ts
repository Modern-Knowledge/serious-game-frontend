import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";
import {environment} from "../../../environments/environment";
import {HttpResponse} from "../../../lib/utils/http/HttpResponse";

@Component({
    selector: "serious-game-reset-password",
    styleUrls: ["./reset-password.page.scss"],
    templateUrl: "./reset-password.page.html"
})
export class ResetPasswordPage implements OnInit {
    public resetPasswordForm: FormGroup;
    private subscription: Subscription = new Subscription();

    /**
     * @param router application router
     * @param authService authentication service
     */
    constructor(
        public router: Router,
        private authService: AuthService,
    ) {}

    /**
     * initiates the form when, the component mounted.
     */
    public ngOnInit() {
        this.resetPasswordForm = new FormGroup({
            email: new FormControl("", [Validators.email, Validators.required]),
            password: new FormControl("", [
                Validators.minLength(environment.passwordLength),
                Validators.required
            ]),
            password_confirmation: new FormControl("", [
                Validators.minLength(environment.passwordLength),
                Validators.required,
            ]),
            token: new FormControl("", [
                Validators.maxLength(environment.tokenLength),
                Validators.minLength(environment.tokenLength),
                Validators.required
            ])
        }, this.matchPasswords
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
                    const httpResponse = new HttpResponse().deserialize(response);
                    this.router.navigateByUrl("/login");
                })
        );
    }

    public matchPasswords(form): Boolean {
        return form.get("password") === form.get("password_confirmation");
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
