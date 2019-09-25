import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { TherapistProfileComponent } from 'src/app/components/therapist/therapist-profile/therapist-profile.component';
import { PatientProfileComponent } from 'src/app/components/patient/patient-profile/patient-profile.component';
import { PatientSelectorComponent } from 'src/app/components/patient/patient-selector/patient-selector.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage, TherapistProfileComponent, PatientProfileComponent, PatientSelectorComponent]
})
export class ProfilePageModule {}
