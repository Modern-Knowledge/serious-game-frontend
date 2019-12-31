import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/components/shared/shared.module";

import { ScoreBoardPage } from "./score-board.page";

const routes: Routes = [
    {
        component: ScoreBoardPage,
        path: ""
    }
];

@NgModule({
    declarations: [ScoreBoardPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class ScoreBoardPageModule {}
