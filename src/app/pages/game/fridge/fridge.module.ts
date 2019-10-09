import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FridgePage } from './fridge.page';
import { GamePageModule } from '../game.module';
import { SharedModule } from 'src/app/components/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: FridgePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [FridgePage]
})
export class FridgePageModule {}
