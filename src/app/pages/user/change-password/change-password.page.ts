import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { environment } from "../../../../environments/environment";
import { HttpResponse } from "../../../../lib/utils/http/HttpResponse";
import { AuthService } from "../../../providers/auth.service";
import { UserService } from "../../../providers/user.service";

@Component({
    selector: "serious-game-change-password",
    styleUrls: ["./change-password.page.scss"],
    templateUrl: "./change-password.page.html"
})
export class ChangePasswordPage implements OnInit, OnDestroy {
    public changePasswordForm: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(
        public router: Router,
        private userService: UserService,
        private authService: AuthService
    ) {}

    /**
     * Creates the form and the
     */
    public ngOnInit() {
        this.changePasswordForm = new FormGroup(
            {
                old_password: new FormControl("", [
                    Validators.minLength(environment.passwordLength),
                    Validators.required
                ]),
                password: new FormControl("", [
                    Validators.minLength(environment.passwordLength),
                    Validators.required
                ]),
                password_confirmation: new FormControl("", [
                    Validators.minLength(environment.passwordLength),
                    Validators.required
                ])
            },
            this.PasswordMatchValidator
        );
    }

    public onChangePassword(): void {
        this.subscription.add(
            this.userService
                .changePassword(
                    this.authService.getUserIdFromToken(),
                    this.changePasswordForm.controls.old_password.value,
                    this.changePasswordForm.controls.password.value,
                    this.changePasswordForm.controls.password_confirmation.value
                )
                .subscribe((response) => {
                    new HttpResponse().deserialize(response);
                })
        );
    }

    /**
     * Checks if both passwords are equal
     * @param form form to take the values from
     */
    public PasswordMatchValidator(form): ValidatorFn {
        if (form.get("password") === form.get("password_confirmation")) {
            return form.get("password").setErrors({ password_mismatch: true });
        }
    }
    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
