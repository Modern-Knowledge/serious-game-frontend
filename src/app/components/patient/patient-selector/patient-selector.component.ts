import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { PatientService } from "src/app/providers/patient.service";
import { PatientDto } from "src/lib/models/Dto/PatientDto";
import { Patient } from "src/lib/models/Patient";

@Component({
    selector: "serious-game-patient-selector",
    styleUrls: ["./patient-selector.component.scss"],
    templateUrl: "./patient-selector.component.html"
})
export class PatientSelectorComponent implements OnInit, OnDestroy {
    public patients: PatientDto[];
    public patientSubscription: Subscription = new Subscription();
    public selectedPatientIds: number[];
    @Input() public selectedPatients: PatientDto[];
    @Output() public patientSelected: EventEmitter<
        PatientDto[]
    > = new EventEmitter();

    constructor(private patientService: PatientService) {}

    public ngOnInit() {
        this.patientSubscription.add(
            this.patientService.getAll().subscribe((patients) => {
                this.patients = patients;
                this.selectedPatientIds = this.selectedPatients.map(
                    (patient) => patient.id
                );
            })
        );
    }
    public selectPatient(value) {
        this.selectedPatients = this.patients.filter((patient) => {
            return value.map((v) => +v).indexOf(patient.id) !== -1;
        });
        this.patientSelected.emit(this.selectedPatients);
    }
    public checkIfPatientIsSelected(patient: Patient) {
        return this.selectedPatients.some(
            (selectedPatient) => selectedPatient.id === patient.id
        );
    }
    public ngOnDestroy() {
        this.patientSubscription.unsubscribe();
    }
}
