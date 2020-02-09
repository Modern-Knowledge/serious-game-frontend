import { Component } from "@angular/core";
import moment from "moment";
import { AuthService } from "src/app/providers/auth.service";

import { environment } from "../../../environments/environment";
import { formatDate } from "../../../lib/utils/dateFormatter";

@Component({
    selector: "serious-game-main-menu",
    styleUrls: ["./main-menu.page.scss"],
    templateUrl: "./main-menu.page.html"
})
export class MainMenuPage {
    public isTherapist: boolean;
    public environment;
    public buildDate;

    constructor(private authService: AuthService) {
        this.environment = environment;
        this.buildDate = formatDate(moment(environment.lastBuildDate).toDate());
    }

    public ionViewWillEnter() {
        this.isTherapist = this.authService.isTherapist();
    }
}
