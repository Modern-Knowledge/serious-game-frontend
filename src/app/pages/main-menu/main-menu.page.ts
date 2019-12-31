import { Component } from "@angular/core";
import { AuthService } from "src/app/providers/auth.service";

@Component({
    selector: "serious-game-main-menu",
    styleUrls: ["./main-menu.page.scss"],
    templateUrl: "./main-menu.page.html"
})
export class MainMenuPage {
    public isTherapist: boolean;

    constructor(private authService: AuthService) {}

    public ionViewWillEnter() {
        this.isTherapist = this.authService.isTherapist();
    }
}
