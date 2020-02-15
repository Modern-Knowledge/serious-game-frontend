import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { IngredientsPage } from "./ingredients.page";

const routes: Routes = [
    {
        component: IngredientsPage,
        path: ""
    }
];

@NgModule({
    declarations: [
        IngredientsPage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
})
export class IngredientsPageModule {}
