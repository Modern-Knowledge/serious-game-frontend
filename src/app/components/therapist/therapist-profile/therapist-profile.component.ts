import { Component, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { TherapistService } from "src/app/providers/therapist.service";
import { TherapistDto } from "src/lib/models/Dto/TherapistDto";
import { Therapist } from "src/lib/models/Therapist";

@Component({
    selector: "serious-game-therapist-profile",
    styleUrls: ["./therapist-profile.component.scss"],
    templateUrl: "./therapist-profile.component.html"
})
export class TherapistProfileComponent implements OnDestroy {
    @Input() public user: Therapist;
    private subscription: Subscription = new Subscription();

    constructor(private therapistService: TherapistService) {}

    public assignPatients(patients) {
        this.user.patients = patients;
        this.subscription.add(
            this.therapistService
                .update(new TherapistDto(this.user))
                .subscribe()
        );
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
