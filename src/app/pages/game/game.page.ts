import {
  Component,
  OnInit,
  ComponentFactory,
  ViewChild,
  ComponentFactoryResolver,
  ElementRef
} from "@angular/core";
import { User } from "src/lib/models/User";
import { Word } from "src/lib/models/Word";
import { Recipe } from "src/lib/models/Recipe";
import { AuthService } from "src/app/providers/auth.service";
import { WordService } from "src/app/providers/word.service";
import { RecipeService } from "src/app/providers/recipe.service";
import { GameService } from "src/app/providers/game.service";
import { Game } from "src/lib/models/Game";
import { ComponentIsDirective } from "src/app/directives/component-is.directive";
import { DayPlanningComponent } from "src/app/components/game/day-planning/day-planning.component";
import { RecipeComponent } from "src/app/components/game/recipe/recipe.component";
import { ShoppingListComponent } from "src/app/components/game/shopping-list/shopping-list.component";
import { ShoppingCenterComponent } from "src/app/components/game/shopping-center/shopping-center.component";
import { GameComponent } from "src/app/components/game/game.component";
import { Subscription, Observable, merge, forkJoin } from "rxjs";

@Component({
  selector: "serious-game-game",
  templateUrl: "./game.page.html",
  styleUrls: ["./game.page.scss"]
})
export class GamePage {
  @ViewChild(ComponentIsDirective, { static: false })
  componentIs: ComponentIsDirective;

  user: Observable<User>;
  data: (Word | Recipe)[];
  games: Game[];
  chosenRecipes: Recipe[] = [];
  step: number;
  gameComponents;

  constructor(
    private authService: AuthService,
    private wordService: WordService,
    private recipeService: RecipeService,
    private gameService: GameService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.step = 0;
  }

  ionViewWillEnter() {
    this.requestMultipleResources().subscribe(responseList => {
      this.user = responseList[0];
      this.data = responseList[1];
      this.games = responseList[2];
      this.loadGame();
    });
  }

  requestMultipleResources(): Observable<any[]> {
    const user = this.authService.getRelatedUser();
    const data = merge(this.wordService.getAll(), this.recipeService.getAll());
    const games = this.gameService.getAll();
    return forkJoin(user, data, games);
  }

  loadGame() {
    this.gameComponents = {
      "serious-game-day-planning": {
        type: DayPlanningComponent,
        data: this.data,
        callback: "addRecipe"
      },
      "serious-game-recipe": {
        type: RecipeComponent,
        data: this.chosenRecipes
      },
      "serious-game-shopping-list": {
        type: ShoppingListComponent,
        data: this.data
      },
      "serious-game-shopping-center": {
        type: ShoppingCenterComponent,
        data: this.data
      }
    };
    const currentGame = this.games[this.step];
    const currentGameComponent = this.gameComponents[
      `serious-game-${currentGame.component}`
    ];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      currentGameComponent.type
    );
    const viewContainerRef = this.componentIs.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const dynamicComponentInstance = <GameComponent>componentRef.instance;
    dynamicComponentInstance.data = currentGameComponent.data;
    dynamicComponentInstance.game = currentGame;
    dynamicComponentInstance.event.subscribe(event =>
      this[currentGameComponent.callback](event)
    );
  }

  onSubmit() {
    this.step++;
    this.loadGame();
  }

  addRecipe(recipe: Recipe) {
    this.chosenRecipes.push(recipe);
  }
}
