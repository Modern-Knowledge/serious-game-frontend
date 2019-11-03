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
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { Patient } from "src/lib/models/Patient";
import { Therapist } from "src/lib/models/Therapist";
import { ToastPosition, ToastWrapper } from "src/app/util/ToastWrapper";
import { HttpResponseMessageSeverity } from "src/lib/utils/http/HttpResponse";
import { ScoredPointsComponent } from "src/app/components/shared/scored-points/scored-points.component";
import { ErrorCountComponent } from "src/app/components/shared/error-count/error-count.component";
import { Errortext } from "src/lib/models/Errortext";
import { ErrorTextService } from "src/app/providers/error-text.service";

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
  @ViewChild(ErrorCountComponent, { static: false })
  errorCount: ErrorCountComponent;

  private user: Therapist | Patient;
  private dayPlanningData: (Word | Recipe)[];
  private games: Game[];
  private chosenRecipes: Recipe[] = [];
  private shoppingCenterData: (Word | Ingredient)[];
  private step: number;
  private elapsedTime: number;
  private gameComponents;
  private subscription: Subscription = new Subscription();
  private errorTexts: Errortext[];
  private canContinue: boolean;

  constructor(
    private wordService: WordService,
    private recipeService: RecipeService,
    private gameService: GameService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ingredientService: IngredientService,
    private sessionService: SessionService,
    private router: Router,
    private userStore: UserStoreService,
    private errorTextService: ErrorTextService
  ) {
    this.step = 0;
  }

  ionViewWillEnter() {
    this.subscription.add(
      this.userStore.user.subscribe(user => {
        this.user = user;
      })
    );
    this.subscription.add(
      this.requestMultipleResources().subscribe(responseList => {
        this.dayPlanningData = responseList[0];
        this.games = responseList[1];
        this.shoppingCenterData = responseList[2];
        this.errorTexts = responseList[3];
        this.loadGame();
      })
    );
  }

  requestMultipleResources(): Observable<any[]> {
    const dayPlanningData = this.recipeService.getAll();
    const games = this.gameService.getAll();
    const shoppingCenterData = this.ingredientService.getAll();
    const errorTexts = this.errorTextService.getAll();
    return forkJoin(dayPlanningData, games, shoppingCenterData, errorTexts);
  }

  loadGame() {
    this.gameComponents = {
      "serious-game-day-planning": {
        type: DayPlanningComponent,
        data: this.dayPlanningData,
        callback: "addRecipe",
        canContinue: false
      },
      "serious-game-recipe": {
        type: RecipeComponent,
        data: this.chosenRecipes,
        canContinue: true
      },
      "serious-game-shopping-list": {
        type: ShoppingListComponent,
        data: this.shoppingCenterData,
        canContinue: true
      },
      "serious-game-shopping-center": {
        type: ShoppingCenterComponent,
        data: this.shoppingCenterData,
        canContinue: true
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
    dynamicComponentInstance.errorTexts = this.errorTexts;
    dynamicComponentInstance.event.subscribe(event =>
      this[currentGameComponent.callback](event)
    );
    dynamicComponentInstance.errorEvent.subscribe(error => {
      this.handleError(error);
    });
    this.canContinue = currentGameComponent.canContinue;
  }

  onSubmit() {
    if (this.stepValid() && this.canContinue) {
      this.stopWatch.reset();
      this.errorCount.reset();
      this.storeSession();
      this.step++;
      this.canContinue = false;
    }
    this.loadGame();
  }

  onFinish() {
    this.stopWatch.reset();
    this.errorCount.reset();
    this.storeSession();
    this.step = 0;
    this.router.navigateByUrl("/main-menu");
  }

  storeSession() {
    const game = this.games[this.step];
    this.subscription.add(
      this.sessionService
        .create(
          game.id,
          this.user.id,
          game.gameSettings[0].id,
          this.elapsedTime
        )
        .subscribe(response => {
          console.log(response);
        })
    );
  }

  addRecipe(recipe: Recipe) {
    this.chosenRecipes.push(recipe);
    this.canContinue = true;
  }

  handleError(error: string) {
    const message = new ToastWrapper(
      error,
      ToastPosition.TOP,
      HttpResponseMessageSeverity.DANGER
    );
    message.alert();
    this.errorCount.increaseCount();
    this.addErrorText(new Errortext());
  }

  addErrorText(errorText: Errortext) {
    // TODO: save error count in statistic_has_errortext
  }

  stepValid(): boolean {
    if (this.games) {
      return this.step < this.games.length - 1;
    }
    return false;
  }

  setTime(time: number) {
    this.elapsedTime = time;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
