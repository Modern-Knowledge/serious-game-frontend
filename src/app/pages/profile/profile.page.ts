import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/providers/auth.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { User } from "src/lib/models/User";
@Component({
    selector: "serious-game-profile",
    templateUrl: "./profile.page.html",
    styleUrls: ["./profile.page.scss"]
})
export class ProfilePage {
    private user: User;
    private isTherapist: boolean;
    private subscription: Subscription = new Subscription();

    constructor(
        private authService: AuthService,
        private userStore: UserStoreService
    ) {}

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
