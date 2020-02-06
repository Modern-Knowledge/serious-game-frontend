import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { PasswordResetPage } from "./password-reset.page";

const routes: Routes = [
  {
    component: PasswordResetPage,
    path: ""
  }
];

@NgModule({
  declarations: [PasswordResetPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class PasswordResetModule {}
