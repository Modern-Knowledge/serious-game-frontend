import { Component, OnInit, Input } from "@angular/core";
import { TherapistService } from "src/app/providers/therapist.service";
import { Therapist } from "src/lib/models/Therapist";

@Component({
  selector: "serious-game-therapist-profile",
  templateUrl: "./therapist-profile.component.html",
  styleUrls: ["./therapist-profile.component.scss"]
})
export class TherapistProfileComponent implements OnInit {
  @Input() user: Therapist;

  constructor(private therapistService: TherapistService) {}

  ngOnInit() {}

  assignPatients(patients) {
    this.user.patients = patients;
    this.therapistService.update(this.user).subscribe(response => {
      console.log(response);
    });
  }
}
