import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "src/app/providers/auth.service";
import {UserStoreService} from "src/app/providers/store/user-store.service";
import {User} from "src/lib/models/User";
import {UserService} from "../../providers/user.service";

@Component({
    selector: "serious-game-profile",
    styleUrls: ["./profile.page.scss"],
    templateUrl: "./profile.page.html"
})
export class ProfilePage implements OnInit {
    private user: User;
    private isTherapist: boolean;
    private subscription: Subscription = new Subscription();
    private changeProfileForm: FormGroup;

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

    /**
     * Creates the change profile form.
     */
    public ngOnInit() {
        this.changeProfileForm = new FormGroup({
            email: new FormControl("", [Validators.email, Validators.required]),
            forename: new FormControl("", Validators.required),
            lastname: new FormControl("", Validators.required),
        });
    }

    public onSave() {
        console.log(this.changeProfileForm.controls);
        this.subscription.add(
            this.userService
                .updateUser(
                    this.user.id,
                    this.changeProfileForm.controls.email.value,
                    this.changeProfileForm.controls.forename.value,
                    this.changeProfileForm.controls.lastname.value
                ).subscribe((response) => {
                    console.log(response);
            })
        );
    }

    public ionViewWillEnter() {
        this.isTherapist = this.authService.isTherapist();
        this.subscription.add(
            this.userStore.user.subscribe((user) => {
                this.user = user;
            })
        );
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
