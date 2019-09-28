import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DayPlanningPage } from "./day-planning.page";
import { DragulaModule } from "ng2-dragula";

const routes: Routes = [
  {
    path: "",
    component: DayPlanningPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DragulaModule
  ],
  declarations: [DayPlanningPage]
})
export class DayPlanningPageModule {}
