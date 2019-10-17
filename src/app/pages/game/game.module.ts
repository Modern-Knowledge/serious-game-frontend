import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { GamePage } from "./game.page";
import { DragulaModule } from "ng2-dragula";
import { DayPlanningComponent } from "src/app/components/game/day-planning/day-planning.component";
import { RecipeComponent } from "src/app/components/game/recipe/recipe.component";
import { ShoppingListComponent } from "src/app/components/game/shopping-list/shopping-list.component";
import { MealtimeComponent } from "src/app/components/game/day-planning/mealtime/mealtime.component";
import { SharedModule } from "src/app/components/shared/shared.module";
import { ShelfComponent } from "src/app/components/game/shopping-center/shelf/shelf.component";
import { ShoppingCenterComponent } from "src/app/components/game/shopping-center/shopping-center.component";
import { DirectivesModule } from "src/app/directives/directives.module";

const routes: Routes = [
  {
    path: "",
    component: GamePage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DragulaModule,
    SharedModule,
    DirectivesModule
  ],
  declarations: [
    GamePage,
    DayPlanningComponent,
    RecipeComponent,
    ShoppingListComponent,
    ShoppingCenterComponent,
    MealtimeComponent,
    ShelfComponent
  ],
  entryComponents: [
    DayPlanningComponent,
    RecipeComponent,
    ShoppingListComponent,
    ShoppingCenterComponent
  ]
})
export class GamePageModule {}
