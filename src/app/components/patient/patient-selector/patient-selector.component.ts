import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { PatientService } from "src/app/providers/patient.service";
import { Patient } from "src/lib/models/Patient";
import { Subscription } from "rxjs";

@Component({
  selector: "serious-game-patient-selector",
  templateUrl: "./patient-selector.component.html",
  styleUrls: ["./patient-selector.component.scss"]
})
export class PatientSelectorComponent implements OnInit {
  patients: Patient[];
  patientSubscription: Subscription = new Subscription();
  @Input() selectedPatients: Patient[];
  @Output() patientSelected: EventEmitter<Patient[]> = new EventEmitter();

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.patientSubscription.add(
      this.patientService.getAll().subscribe(patients => {
        this.patients = patients;
      })
    );
  }
  selectPatient(value) {
    this.selectedPatients = this.patients.filter(patient => {
      return value.map(v => +v).indexOf(patient.id) !== -1;
    });
    this.patientSelected.emit(this.selectedPatients);
  }
  checkIfPatientIsSelected(patient: Patient) {
    return this.selectedPatients.some(
      selectedPatient => selectedPatient.id === patient.id
    );
  }
  ngOnDestroy() {
    this.patientSubscription.unsubscribe();
  }
}
