import { Component, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { TherapistService } from "src/app/providers/therapist.service";
import { TherapistDto } from "src/lib/models/Dto/TherapistDto";

@Component({
    selector: "serious-game-therapist-profile",
    styleUrls: ["./therapist-profile.component.scss"],
    templateUrl: "./therapist-profile.component.html"
})
export class TherapistProfileComponent implements OnDestroy {
    @Input() public user: TherapistDto;
    private subscription: Subscription = new Subscription();

    constructor(private therapistService: TherapistService) {}

    public assignPatients(patients) {
        this.user.patients = patients;
        this.therapistService.update(this.user).subscribe();
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
