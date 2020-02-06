import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MainMenuPage } from "./main-menu.page";

const routes: Routes = [
    {
        component: MainMenuPage,
        path: ""
    }
];

@NgModule({
    declarations: [MainMenuPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
})
export class MainMenuPageModule {}
