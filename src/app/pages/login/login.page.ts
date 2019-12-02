import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";
import { HttpResponse } from "../../../lib/utils/http/HttpResponse";

@Component({
    selector: "serious-game-login",
    styleUrls: ["./login.page.scss"],
    templateUrl: "./login.page.html"
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(
        public router: Router,
        private authService: AuthService,
    ) {}

    public ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl("", [Validators.email, Validators.required]),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(6)
            ])
        });
    }

    /**
     * Executed, when the login button is clicked.
     * Tries to login with the provided credentials.
     * If the login was successful, the application navigates to the main menu.
     */
    public onLogin(): void {
        this.subscription.add(
            this.authService
                .login(
                    this.loginForm.controls.email.value,
                    this.loginForm.controls.password.value
                )
                .subscribe((response) => {
                    const httpResponse = new HttpResponse().deserialize(response);
                    // login successful if there's a jwt token in the response
                    const token = httpResponse.data.token;
                    this.authService.setToken(token);
                    this.router.navigateByUrl("/main-menu");
                })
        );
    }

    /**
     * Navigates to the registration, if the register button was pressed
     */
    public onSignUp(): void {
        this.router.navigateByUrl("/registration");
    }

    /**
     * Navigates to the password-reset form, if the password-reset button was pressed
     */
    public onPasswordForgotten(): void {
        this.router.navigateByUrl("/password-reset");
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
