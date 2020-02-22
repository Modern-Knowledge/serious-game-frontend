import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { DragulaModule } from "ng2-dragula";
import { DayPlanningComponent } from "src/app/components/game/day-planning/day-planning.component";
import { MealtimeComponent } from "src/app/components/game/day-planning/mealtime/mealtime.component";
import { RecipeComponent } from "src/app/components/game/recipe/recipe.component";
import { ShelfComponent } from "src/app/components/game/shopping-center/shelf/shelf.component";
import { ShoppingCenterComponent } from "src/app/components/game/shopping-center/shopping-center.component";
import { ShoppingListComponent } from "src/app/components/game/shopping-list/shopping-list.component";
import { SharedModule } from "src/app/components/shared/shared.module";
import { DirectivesModule } from "src/app/directives/directives.module";

import { FridgePage } from "./fridge/fridge.page";
import { GamePage } from "./game.page";
import { ShelfPage } from "./shelf/shelf.page";

const routes: Routes = [
    {
        component: GamePage,
        path: ""
    }
];
@NgModule({
    declarations: [
        GamePage,
        DayPlanningComponent,
        RecipeComponent,
        ShoppingListComponent,
        ShoppingCenterComponent,
        MealtimeComponent,
        ShelfComponent,
        FridgePage,
        ShelfPage
    ],
    entryComponents: [
        DayPlanningComponent,
        RecipeComponent,
        ShoppingListComponent,
        ShoppingCenterComponent,
        FridgePage,
        ShelfPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        DragulaModule,
        SharedModule,
        DirectivesModule
    ]
})
export class GamePageModule {}
