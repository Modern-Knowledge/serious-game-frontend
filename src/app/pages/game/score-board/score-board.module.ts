import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { PatientScoreBoardComponent } from "src/app/components/patients/patient-score-board/patient-score-board.component";
import { SharedModule } from "src/app/components/shared/shared.module";
import {
    TherapistScoreBoardComponent,
} from "src/app/components/therapist/therapist-score-board/therapist-score-board.component";

import { ScoreBoardPage } from "./score-board.page";

const routes: Routes = [
    {
        component: ScoreBoardPage,
        path: ""
    }
];

@NgModule({
    declarations: [
        ScoreBoardPage,
        PatientScoreBoardComponent,
        TherapistScoreBoardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class ScoreBoardPageModule {}
