import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { SalutationPipe } from "src/app/pipes/salutation.pipe";

import { HomePage } from "./home.page";

@NgModule({
    declarations: [HomePage, SalutationPipe],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                component: HomePage,
                path: ""
            }
        ])
    ]
})
export class HomePageModule {}
