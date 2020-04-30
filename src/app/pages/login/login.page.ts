import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import moment from "moment";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";

import { environment } from "../../../environments/environment";
import { formatDate } from "serious-game-library/dist/utils/dateFormatter";
import { HttpResponse } from "serious-game-library/dist/utils/http/HttpResponse";

@Component({
    selector: "serious-game-login",
    styleUrls: ["./login.page.scss"],
    templateUrl: "./login.page.html"
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public environment;
    public buildDate;
    private subscription: Subscription;
    constructor(
        public router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {
        this.environment = environment;
        this.buildDate = formatDate(moment(environment.lastBuildDate).toDate());
    }

    public ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.email, Validators.required]],
            loggedin: [false],
            password: ["", [Validators.required, Validators.minLength(6)]]
        });
    }

    public ionViewWillEnter() {
        this.subscription = new Subscription();
        this.subscription.add(
            this.authService.isLoggedIn().subscribe((isLoggedIn) => {
                if (isLoggedIn) {
                    this.router.navigateByUrl("main-menu");
                    return true;
                }
            })
        );
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
                    this.loginForm.controls.password.value,
                    this.loginForm.controls.loggedin.value
                )
                .subscribe((response) => {
                    const httpResponse = new HttpResponse().deserialize(
                        response
                    );
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

    /**
     * Unsubscribes from the AuthService subscription on destroy.
     */
    public ionViewWillLeave() {
        this.loginForm.reset();
        this.subscription.unsubscribe();
    }
}
