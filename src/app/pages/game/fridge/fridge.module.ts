import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { SharedModule } from "src/app/components/shared/shared.module";
import { GamePageModule } from "../game.module";
import { FridgePage } from "./fridge.page";

const routes: Routes = [
  {
    path: "",
    component: FridgePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [FridgePage]
})
export class FridgePageModule {}
