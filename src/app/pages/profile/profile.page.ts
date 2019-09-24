import { Component, OnInit } from "@angular/core";
import { User } from "src/lib/models/User";
import { AuthService } from "src/app/providers/auth.service";
import { Patient } from "src/lib/models/Patient";
import { PatientService } from "src/app/providers/patient.service";
import { TherapistService } from "src/app/providers/therapist.service";
import { Therapist } from "src/lib/models/Therapist";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  user: Therapist = new Therapist();
  constructor(
    private authService: AuthService,
    private patientService: PatientService,
    private therapistService: TherapistService
  ) {}

  ngOnInit() {
    this.authService.getRelatedUser().subscribe(user => {
      this.user.id = user.id;
      this.user.gender = user.gender;
      this.user.forename = user.forename;
      this.user.lastname = user.lastname;
      this.user.email = user.email;
    });
  }
  assignPatients(patients) {
    this.user.patients = patients;
    this.therapistService.update(this.user).subscribe(response => {
      console.log(response);
    });
  }
}
