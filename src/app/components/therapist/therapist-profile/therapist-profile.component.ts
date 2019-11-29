import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { TherapistService } from "src/app/providers/therapist.service";
import { Therapist } from "src/lib/models/Therapist";

@Component({
    selector: "serious-game-therapist-profile",
    styleUrls: ["./therapist-profile.component.scss"],
    templateUrl: "./therapist-profile.component.html",
})
export class TherapistProfileComponent implements OnInit {
    @Input() public user: Therapist;
    private subscription: Subscription = new Subscription();

    constructor(private therapistService: TherapistService) {}

    public ngOnInit() {}

    public assignPatients(patients) {
        this.user.patients = patients;
        this.subscription.add(
            this.therapistService.update(this.user).subscribe((response) => {
                console.log(response);
            })
        );
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
