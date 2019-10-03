import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GamePage } from './game.page';
import { DragulaModule } from 'ng2-dragula';
import { DayPlanningComponent } from 'src/app/components/game/day-planning/day-planning.component';
import { RecipeComponent } from 'src/app/components/game/recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    component: GamePage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DragulaModule
  ],
  declarations: [GamePage, DayPlanningComponent, RecipeComponent]
})
export class GamePageModule {}
