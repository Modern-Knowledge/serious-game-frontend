import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ChangePasswordPage } from "./change-password.page";

const routes: Routes = [
  {
    component: ChangePasswordPage,
    path: ""
  }
];

@NgModule({
  declarations: [ChangePasswordPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class ChangePasswordPageModule {}
