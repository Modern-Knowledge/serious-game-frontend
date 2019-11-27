import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpResponse} from "../../../../lib/utils/http/HttpResponse";
import {AuthService} from "../../../providers/auth.service";
import {UserService} from "../../../providers/user.service";

@Component({
    selector: "serious-game-change-password",
    styleUrls: ["./change-password.page.scss"],
    templateUrl: "./change-password.page.html",
})
export class ChangePasswordPage implements OnInit {
    private changePasswordForm: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(public router: Router,
                private userService: UserService,
                private authService: AuthService
    ) {}

    /**
     * Creates the form and the
     */
    public ngOnInit() {
        this.changePasswordForm = new FormGroup({
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
                    Validators.required,
                ]),

            }, this.matchPasswords
        );
    }

    public onChangePassword(): void {
        this.subscription.add(
            this.userService
                .changePassword(
                    this.authService.getUserIdFromToken(),
                    this.changePasswordForm.controls.old_password.value,
                    this.changePasswordForm.controls.password.value,
                    this.changePasswordForm.controls.password_confirmation.value,
                )
                .subscribe((response) => {
                    const httpResponse = new HttpResponse().deserialize(response);
                    this.router.navigateByUrl("/login");
                })
        );
    }

    /**
     * Checks if both passwords are equal
     * @param form form to take the values from
     */
    public matchPasswords(form): Boolean {
        return form.get("password") === form.get("password_confirmation");
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
