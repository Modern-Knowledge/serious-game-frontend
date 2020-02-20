import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { UserDto } from "src/lib/models/Dto/UserDto";

import { UserService } from "../../providers/user.service";

@Component({
    selector: "serious-game-profile",
    styleUrls: ["./profile.page.scss"],
    templateUrl: "./profile.page.html"
})
export class ProfilePage implements OnDestroy {
    public user: UserDto;
    public isTherapist: boolean;
    public changeProfileForm: FormGroup;
    private subscription: Subscription = new Subscription();

    /**
     * @param authService authentication service
     * @param userStore user store
     * @param userService user service
     */
    constructor(
        private authService: AuthService,
        private userStore: UserStoreService,
        private userService: UserService
    ) {}

    public onSave() {
        this.subscription.add(
            this.userService
                .updateUser(
                    this.user.id,
                    this.changeProfileForm.controls.email.value,
                    this.changeProfileForm.controls.forename.value,
                    this.changeProfileForm.controls.lastname.value
                )
                .subscribe()
        );
    }

    public ionViewWillEnter() {
        this.isTherapist = this.authService.isTherapist();
        this.subscription.add(
            this.userStore.user.subscribe((user) => {
                this.user = user;
                this.changeProfileForm = new FormGroup({
                    email: new FormControl(this.user.email || "", [
                        Validators.email,
                        Validators.required
                    ]),
                    forename: new FormControl(
                        this.user.forename || "",
                        Validators.required
                    ),
                    lastname: new FormControl(
                        this.user.lastname || "",
                        Validators.required
                    )
                });
            })
        );
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
