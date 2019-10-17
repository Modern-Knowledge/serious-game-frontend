import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ShelfPage } from "./shelf.page";
import { SharedModule } from "src/app/components/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: ShelfPage
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
  declarations: [ShelfPage]
})
export class ShelfPageModule {}
