import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { RegistrationPage } from "./registration.page";

const routes: Routes = [
    {
        component: RegistrationPage,
        path: ""
    }
];

@NgModule({
    declarations: [RegistrationPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class RegistrationPageModule {}
