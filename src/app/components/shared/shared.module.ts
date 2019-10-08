import { NgModule } from '@angular/core';

import { DragZoneComponent } from './drag-zone/drag-zone.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { DragulaModule } from 'ng2-dragula';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    DragulaModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    DragZoneComponent,
    DropZoneComponent,
  ],
  exports: [
      DragZoneComponent,
      DropZoneComponent
    ]
})
export class SharedModule {}
