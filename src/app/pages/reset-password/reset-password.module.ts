import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ResetPasswordPage } from "./reset-password.page";

const routes: Routes = [
  {
    component: ResetPasswordPage,
    path: ""
  }
];

@NgModule({
  declarations: [ResetPasswordPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class ResetPasswordModule {}
