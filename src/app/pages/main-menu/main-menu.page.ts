import { Component } from "@angular/core";
import moment from "moment";
import { AuthService } from "src/app/providers/auth.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { PatientDto } from "src/lib/models/Dto/PatientDto";

import { environment } from "../../../environments/environment";
import { formatDate } from "../../../lib/utils/dateFormatter";

@Component({
    selector: "serious-game-main-menu",
    styleUrls: ["./main-menu.page.scss"],
    templateUrl: "./main-menu.page.html"
})
export class MainMenuPage {
    public isTherapist: boolean;
    public isAdmin: boolean;
    public environment;
    public buildDate;
    public skipIntroduction: boolean = true;

    constructor(
        private authService: AuthService,
        private userStore: UserStoreService
    ) {
        this.environment = environment;
        this.buildDate = formatDate(moment(environment.lastBuildDate).toDate());
    }

    public ionViewWillEnter() {
        this.isTherapist = this.authService.isTherapist();
        this.isAdmin = this.authService.isAdmin();
        this.userStore.user.subscribe((user) => {
            if (!this.isTherapist) {
                this.skipIntroduction = (user as PatientDto).patientSetting.skipIntroduction;
            }
        });
    }
}
