import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PatientService } from "src/app/providers/patient.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { PatientDto } from "serious-game-library/dist/models/Dto/PatientDto";

@Component({
    selector: "serious-game-introduction",
    styleUrls: ["./introduction.page.scss"],
    templateUrl: "./introduction.page.html"
})
export class IntroductionPage implements OnInit {
    public user: PatientDto;
    private subscription: Subscription = new Subscription();

    constructor(
        private patientService: PatientService,
        private userStore: UserStoreService
    ) {}

    public ngOnInit() {
        this.subscription.add(
            this.userStore.user.subscribe((user) => {
                this.user = user as PatientDto;
            })
        );
    }

    public setSkipIntroduction() {
        this.user.patientSetting.skipIntroduction = !this.user.patientSetting
            .skipIntroduction;

        this.subscription.add(
            this.patientService.update(this.user).subscribe()
        );
    }
}
