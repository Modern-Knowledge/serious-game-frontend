import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { LogPage } from "./log.page";

const routes: Routes = [
    {
        component: LogPage,
        path: "",
    }
];

@NgModule({
    declarations: [LogPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
})
export class LogPageModule {}
