import { Component, Input, OnInit } from "@angular/core";
import { PatientService } from "src/app/providers/patient.service";
import { Patient } from "src/lib/models/Patient";

@Component({
  selector: "serious-game-patient-profile",
  styleUrls: ["./patient-profile.component.scss"],
  templateUrl: "./patient-profile.component.html"
})
export class PatientProfileComponent implements OnInit {

  @Input() public user: Patient;

  constructor(private patientService: PatientService) { }

  public ngOnInit() {}

}
