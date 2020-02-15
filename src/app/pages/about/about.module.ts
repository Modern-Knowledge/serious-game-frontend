import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { NgxMdModule } from "ngx-md";
import { AboutPage } from "./about.page";

const routes: Routes = [
    {
        component: AboutPage,
        path: "",
    }
];

@NgModule({
    declarations: [AboutPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgxMdModule.forRoot(),
    ],
})
export class AboutPageModule {}
