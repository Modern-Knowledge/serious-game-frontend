import { Component, OnInit } from "@angular/core";
import { User } from "src/lib/models/User";
import { AuthService } from "src/app/providers/auth.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
@Component({
  selector: "serious-game-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage {
  user: User;
  isTherapist: boolean;
  constructor(
    private authService: AuthService,
    private userStore: UserStoreService
  ) {}

  ionViewWillEnter() {
    this.isTherapist = this.authService.isTherapist();
    this.userStore.user.subscribe(user => {
      this.user = user;
    });
  }
}
