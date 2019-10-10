import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { GamePage } from "./game.page";
import { DragulaModule } from "ng2-dragula";
import { DayPlanningComponent } from "src/app/components/game/day-planning/day-planning.component";
import { RecipeComponent } from "src/app/components/game/recipe/recipe.component";
import { HelptextComponent } from "src/app/components/shared/helptext/helptext.component";
import { ShoppingListComponent } from "src/app/components/game/shopping-list/shopping-list.component";
import { MealtimeComponent } from "src/app/components/game/day-planning/mealtime/mealtime.component";
import { DragZoneComponent } from "src/app/components/shared/drag-zone/drag-zone.component";
import { DropZoneComponent } from "src/app/components/shared/drop-zone/drop-zone.component";
import { FridgePageModule } from "./fridge/fridge.module";
import { SharedModule } from "src/app/components/shared/shared.module";
import { ShelfComponent } from "src/app/components/game/shopping-center/shelf/shelf.component";
import { ShoppingCenterComponent } from "src/app/components/game/shopping-center/shopping-center.component";
import { DirectivesModule } from "src/app/directives/directives.module";
import { CartComponent } from "src/app/components/game/shopping-center/cart/cart.component";

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
    HelptextComponent,
    ShoppingListComponent,
    ShoppingCenterComponent,
    MealtimeComponent,
    ShelfComponent,
    CartComponent
  ],
  entryComponents: [
    DayPlanningComponent,
    RecipeComponent,
    ShoppingListComponent,
    ShoppingCenterComponent
  ]
})
export class GamePageModule {}
