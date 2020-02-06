import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ComponentIsDirective } from "./component-is.directive";

@NgModule({
    declarations: [ComponentIsDirective],
    exports: [ComponentIsDirective],
    imports: [CommonModule]
})
export class DirectivesModule {}
