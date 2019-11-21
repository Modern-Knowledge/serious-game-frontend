import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";
import {HttpResponse} from "../../../lib/utils/http/HttpResponse";

@Component({
    selector: "serious-game-reset-password",
    styleUrls: ["./reset-password.page.scss"],
    templateUrl: "./reset-password.page.html"
})
export class ResetPasswordPage implements OnInit {
    public resetPasswordForm: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(
        public router: Router,
        private authService: AuthService,
    ) {}

    /**
     * initiates the form when, the component mounted
     */
    public ngOnInit() {
        this.resetPasswordForm = new FormGroup({
            email: new FormControl("", [Validators.email, Validators.required]),
            password: new FormControl("", [Validators.minLength(6), Validators.required]),
            token: new FormControl("", [Validators.minLength(8), Validators.required])
        });
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
                    this.resetPasswordForm.controls.token.value
                )
                .subscribe((response) => {
                    const httpResponse = new HttpResponse().deserialize(response);
                    console.log(httpResponse);
                    this.router.navigateByUrl("/login");
                })
        );
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
