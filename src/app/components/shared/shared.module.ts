import { NgModule } from "@angular/core";

import { DragZoneComponent } from "./drag-zone/drag-zone.component";
import { DropZoneComponent } from "./drop-zone/drop-zone.component";
import { DragulaModule } from "ng2-dragula";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CartComponent } from "./cart/cart.component";
import { HelptextComponent } from "./helptext/helptext.component";
import { StopwatchComponent } from "./stopwatch/stopwatch.component";
import { ScoredPointsComponent } from "./scored-points/scored-points.component";

@NgModule({
  imports: [DragulaModule, CommonModule, FormsModule, IonicModule],
  declarations: [
    DragZoneComponent,
    DropZoneComponent,
    CartComponent,
    HelptextComponent,
    StopwatchComponent,
    ScoredPointsComponent
  ],
  exports: [
    DragZoneComponent,
    DropZoneComponent,
    CartComponent,
    HelptextComponent,
    StopwatchComponent,
    ScoredPointsComponent
  ]
})
export class SharedModule {}
