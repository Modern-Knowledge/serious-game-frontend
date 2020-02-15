import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {LogsPage} from "./logs.page";

const routes: Routes = [
    {
        component: LogsPage,
        path: ""
    }
];

@NgModule({
    declarations: [LogsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
})
export class LogsPageModule {
}
