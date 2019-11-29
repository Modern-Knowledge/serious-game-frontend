import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { DragulaModule } from "ng2-dragula";

import { CartComponent } from "./cart/cart.component";
import { DragZoneComponent } from "./drag-zone/drag-zone.component";
import { DropZoneComponent } from "./drop-zone/drop-zone.component";
import { ErrorCountComponent } from "./error-count/error-count.component";
import { HelptextButtonComponent } from "./helptext-button/helptext-button.component";
import { HelptextComponent } from "./helptext/helptext.component";
import { ImageComponent } from "./image/image.component";
import { StopwatchComponent } from "./stopwatch/stopwatch.component";

@NgModule({
    imports: [DragulaModule, CommonModule, FormsModule, IonicModule],
    declarations: [
        DragZoneComponent,
        DropZoneComponent,
        CartComponent,
        HelptextComponent,
        StopwatchComponent,
        ErrorCountComponent,
        HelptextButtonComponent,
        ImageComponent
    ],
    entryComponents: [HelptextComponent],
    exports: [
        DragZoneComponent,
        DropZoneComponent,
        CartComponent,
        HelptextComponent,
        StopwatchComponent,
        ErrorCountComponent,
        HelptextButtonComponent,
        ImageComponent
    ]
})
export class SharedModule {}
