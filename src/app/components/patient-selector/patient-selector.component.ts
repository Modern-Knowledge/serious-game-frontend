import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { PatientService } from "src/app/providers/patient.service";
import { Patient } from "src/lib/models/Patient";

@Component({
  selector: "app-patient-selector",
  templateUrl: "./patient-selector.component.html",
  styleUrls: ["./patient-selector.component.scss"]
})
export class PatientSelectorComponent implements OnInit {
  patients: Patient[];
  selectedPatients: Patient[];
  @Output() patientSelected: EventEmitter<Patient[]> = new EventEmitter();

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.patientService.getAll().subscribe(patients => {
      this.patients = patients;
    });
  }
  selectPatient(value) {
    this.selectedPatients = this.patients.filter(patient => {
      return value.map(v => +v).indexOf(patient.id) !== -1;
    });
    this.patientSelected.emit(this.selectedPatients);
  }
}
