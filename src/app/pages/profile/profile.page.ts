import { Component, OnInit } from "@angular/core";
import { User } from "src/lib/models/User";
import { AuthService } from "src/app/providers/auth.service";
import { Patient } from "src/lib/models/Patient";
import { PatientService } from "src/app/providers/patient.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.authService.getRelatedUser().subscribe(user => {
      this.user = user;
    });
  }
  assignPatients(patients) {}
}
