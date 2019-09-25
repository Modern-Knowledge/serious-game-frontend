import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/lib/models/Patient';
import { PatientService } from 'src/app/providers/patient.service';

@Component({
  selector: 'serious-game-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {

  @Input() user: Patient;

  constructor(private patientService: PatientService) { }

  ngOnInit() {}

}
