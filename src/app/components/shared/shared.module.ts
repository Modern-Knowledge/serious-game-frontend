import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { DragulaModule } from "ng2-dragula";

import { CartComponent } from "./cart/cart.component";
import { ErrorCountComponent } from "./error-count/error-count.component";
import { HelptextButtonComponent } from "./helptext-button/helptext-button.component";
import { HelptextComponent } from "./helptext/helptext.component";
import { ImageComponent } from "./image/image.component";
import { ScoredPointsComponent } from "./scored-points/scored-points.component";
import { StopwatchComponent } from "./stopwatch/stopwatch.component";

@NgModule({
    declarations: [
        CartComponent,
        HelptextComponent,
        StopwatchComponent,
        ErrorCountComponent,
        HelptextButtonComponent,
        ImageComponent,
        ScoredPointsComponent
    ],
    entryComponents: [HelptextComponent],
    exports: [
        CartComponent,
        HelptextComponent,
        StopwatchComponent,
        ErrorCountComponent,
        HelptextButtonComponent,
        ImageComponent,
        ScoredPointsComponent
    ],
    imports: [DragulaModule, CommonModule, FormsModule, IonicModule]
})
export class SharedModule {}
