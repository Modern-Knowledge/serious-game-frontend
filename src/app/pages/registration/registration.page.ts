import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";
import { User } from "src/lib/models/User";

import {JwtHelperService} from "@auth0/angular-jwt";
import { environment } from "../../../environments/environment";
import { HttpResponse } from "../../../lib/utils/http/HttpResponse";

@Component({
    selector: "serious-game-registration",
    styleUrls: ["./registration.page.scss"],
    templateUrl: "./registration.page.html"
})
export class RegistrationPage implements OnInit, OnDestroy {
    public registrationForm: FormGroup;
    private subscription: Subscription = new Subscription();
    private environment;
    private helper = new JwtHelperService();

    constructor(private authService: AuthService, private router: Router) {
        this.environment = environment.appName;
    }

    public ngOnInit() {
        this.registrationForm = new FormGroup(
            {
                email: new FormControl("", [
                    Validators.email,
                    Validators.required
                ]),
                forename: new FormControl("", Validators.required),
                gender: new FormControl("", [Validators.required]),
                lastname: new FormControl("", Validators.required),
                password: new FormControl("", [
                    Validators.required,
                    Validators.minLength(environment.passwordLength)
                ]),
                password_confirmation: new FormControl("", Validators.required),
                therapist: new FormControl(false)
            },
            this.PasswordMatchValidator
        );
    }

    public onSubmit() {
        const user = new User().deserialize(this.registrationForm.value);
        if (!user.gender) {
            user.gender = 0;
        }
        this.subscription.add(
            this.authService
                .register(user, this.registrationForm.controls.therapist.value)
                .subscribe((response: User) => {
                    const httpResponse = new HttpResponse().deserialize(
                        response
                    );

                    const token = httpResponse.data.token;
                    this.authService.setToken(token);
                    const authUser = this.helper.decodeToken(token);

                    if (authUser.therapist === true) {
                        this.router.navigateByUrl("/login");
                    } else {
                        this.router.navigateByUrl("/main-menu");
                    }
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
