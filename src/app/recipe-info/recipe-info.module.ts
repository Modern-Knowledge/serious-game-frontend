/*
 * Copyright (c) 2020 Florian Mold
 * All rights reserved.
 */

import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {RecipeInfoPage} from "./recipe-info.page";

const routes: Routes = [
    {
        component: RecipeInfoPage,
        path: "",
    }
];

@NgModule({
    declarations: [RecipeInfoPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
})
export class RecipeInfoPageModule {
}
