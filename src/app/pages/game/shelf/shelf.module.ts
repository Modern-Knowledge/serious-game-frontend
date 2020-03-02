import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/components/shared/shared.module";

import { ShelfPage } from "./shelf.page";

const routes: Routes = [
    {
        component: ShelfPage,
        path: ""
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class ShelfPageModule {}
