import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { PatientProfileComponent } from "src/app/components/patient/patient-profile/patient-profile.component";
import { PatientSelectorComponent } from "src/app/components/patient/patient-selector/patient-selector.component";
import { TherapistProfileComponent } from "src/app/components/therapist/therapist-profile/therapist-profile.component";
import { ProfilePage } from "./profile.page";

const routes: Routes = [
    {
        component: ProfilePage,
        path: ""
    }
];

@NgModule({
    declarations: [
        ProfilePage,
        TherapistProfileComponent,
        PatientProfileComponent,
        PatientSelectorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
})
export class ProfilePageModule {}
