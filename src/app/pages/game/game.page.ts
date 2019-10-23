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
import { IngredientService } from "src/app/providers/ingredient.service";
import { Ingredient } from "src/lib/models/Ingredient";
import { StopwatchComponent } from "src/app/components/shared/stopwatch/stopwatch.component";
import { SessionService } from "src/app/providers/session.service";
import { Router } from "@angular/router";

@Component({
  selector: "serious-game-game",
  templateUrl: "./game.page.html",
  styleUrls: ["./game.page.scss"]
})
export class GamePage {
  @ViewChild(StopwatchComponent, { static: false })
  stopWatch: StopwatchComponent;
  @ViewChild(ComponentIsDirective, { static: false })
  componentIs: ComponentIsDirective;

  user: Observable<User>;
  dayPlanningData: (Word | Recipe)[];
  games: Game[];
  chosenRecipes: Recipe[] = [];
  shoppingCenterData: (Word | Ingredient)[];
  step: number;
  gameComponents;

  constructor(
    private authService: AuthService,
    private wordService: WordService,
    private recipeService: RecipeService,
    private gameService: GameService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ingredientService: IngredientService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.step = 0;
  }

  ionViewWillEnter() {
    this.requestMultipleResources().subscribe(responseList => {
      this.user = responseList[0];
      this.dayPlanningData = responseList[1];
      this.games = responseList[2];
      this.shoppingCenterData = responseList[3];
      this.loadGame();
    });
  }

  requestMultipleResources(): Observable<any[]> {
    const user = this.authService.getRelatedUser();
    const dayPlanningData = this.recipeService.getAll();
    const games = this.gameService.getAll();
    const shoppingCenterData = this.ingredientService.getAll();
    return forkJoin(user, dayPlanningData, games, shoppingCenterData);
  }

  loadGame() {
    this.gameComponents = {
      "serious-game-day-planning": {
        type: DayPlanningComponent,
        data: this.dayPlanningData,
        callback: "addRecipe"
      },
      "serious-game-recipe": {
        type: RecipeComponent,
        data: this.chosenRecipes
      },
      "serious-game-shopping-list": {
        type: ShoppingListComponent,
        data: this.shoppingCenterData
      },
      "serious-game-shopping-center": {
        type: ShoppingCenterComponent,
        data: this.shoppingCenterData
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
    if (this.stepValid()) {
      this.storeSession();
      this.step++;
      this.stopWatch.reset();
    }
    this.loadGame();
  }

  onFinish() {
    this.stopWatch.reset();
    this.storeSession();
    this.router.navigateByUrl("/main-menu");
  }

  storeSession() {
    const game = this.games[this.step];
    const userId = this.authService.getUserIdFromToken();
    this.sessionService
      .create(game.id, userId, game.gameSettings[0].id)
      .subscribe(response => {
        console.log(response);
      });
  }

  addRecipe(recipe: Recipe) {
    this.chosenRecipes.push(recipe);
  }

  stepValid(): boolean {
    if (this.games) {
      return this.step < this.games.length - 1;
    }
    return false;
  }

  setTime(time: number) {
    this.games[this.step];
  }
}
