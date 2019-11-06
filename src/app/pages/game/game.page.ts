import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subject, Subscription } from 'rxjs';
import { DayPlanningComponent } from 'src/app/components/game/day-planning/day-planning.component';
import { GameComponent } from 'src/app/components/game/game.component';
import { RecipeComponent } from 'src/app/components/game/recipe/recipe.component';
import { ShoppingCenterComponent } from 'src/app/components/game/shopping-center/shopping-center.component';
import { ShoppingListComponent } from 'src/app/components/game/shopping-list/shopping-list.component';
import { ErrorCountComponent } from 'src/app/components/shared/error-count/error-count.component';
import { StopwatchComponent } from 'src/app/components/shared/stopwatch/stopwatch.component';
import { ComponentIsDirective } from 'src/app/directives/component-is.directive';
import { ErrorTextService } from 'src/app/providers/error-text.service';
import { GameService } from 'src/app/providers/game.service';
import { IngredientService } from 'src/app/providers/ingredient.service';
import { RecipeService } from 'src/app/providers/recipe.service';
import { SessionService } from 'src/app/providers/session.service';
import { UserStoreService } from 'src/app/providers/store/user-store.service';
import { WordService } from 'src/app/providers/word.service';
import { ToastPosition, ToastWrapper } from 'src/app/util/ToastWrapper';
import { Errortext } from 'src/lib/models/Errortext';
import { Game } from 'src/lib/models/Game';
import { Ingredient } from 'src/lib/models/Ingredient';
import { Patient } from 'src/lib/models/Patient';
import { Recipe } from 'src/lib/models/Recipe';
import { Therapist } from 'src/lib/models/Therapist';
import { Word } from 'src/lib/models/Word';
import { HttpResponseMessageSeverity } from 'src/lib/utils/http/HttpResponse';

@Component({
  selector: 'serious-game-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage {
  @ViewChild(StopwatchComponent, { static: false })
  stopWatch: StopwatchComponent;
  @ViewChild(ComponentIsDirective, { static: false })
  componentIs: ComponentIsDirective;
  @ViewChild(ErrorCountComponent, { static: false })
  errorCount: ErrorCountComponent;

  public user: Therapist | Patient;
  private dayPlanningData: (Word | Recipe)[];
  public games: Game[];
  private chosenRecipes: Recipe[] = [];
  private shoppingCenterData: (Word | Ingredient)[];
  public step: number;
  private elapsedTime: number;
  private gameComponents;
  private subscription: Subscription = new Subscription();
  private errorTexts: Errortext[];
  private canContinue: boolean;
  private mainGameSubject: Subject<any> = new Subject();
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

    return forkJoin([dayPlanningData, games, shoppingCenterData, errorTexts]);
  }

  loadGame() {
    this.gameComponents = {
      'serious-game-day-planning': {
        type: DayPlanningComponent,
        data: this.dayPlanningData,
        callback: 'addRecipe',
        canContinue: false
      },
      'serious-game-recipe': {
        type: RecipeComponent,
        data: this.chosenRecipes,
        canContinue: true
      },
      'serious-game-shopping-list': {
        type: ShoppingListComponent,
        data: this.shoppingCenterData,
        callback: 'setCanContinue',
        canContinue: false
      },
      'serious-game-shopping-center': {
        type: ShoppingCenterComponent,
        data: this.shoppingCenterData,
        callback: 'setCanContinue',
        canContinue: false
      }
    };
    const currentGame = this.games[this.step];
    const currentGameComponent = this.gameComponents[`serious-game-${currentGame.component}`];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      currentGameComponent.type
    );
    const viewContainerRef = this.componentIs.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const dynamicComponentInstance = componentRef.instance as GameComponent;
    dynamicComponentInstance.data = currentGameComponent.data;
    dynamicComponentInstance.game = currentGame;
    dynamicComponentInstance.mainGameSubject = this.mainGameSubject;
    dynamicComponentInstance.errorTexts = this.errorTexts;
    dynamicComponentInstance.event.subscribe(event => {
      if (currentGameComponent.callback) {
        this[currentGameComponent.callback](event);
      }
    });

    dynamicComponentInstance.errorEvent.subscribe(error => {
      this.handleError(error);
    });
    this.canContinue = currentGameComponent.canContinue;
  }

  onSubmit() {
    this.mainGameSubject.next();
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
    this.mainGameSubject.next();
    if (this.canContinue) {
      this.stopWatch.reset();
      this.errorCount.reset();
      this.storeSession();
      this.step = 0;
      this.router.navigateByUrl('/main-menu');
    }
  }

  storeSession() {
    const game = this.games[this.step];
    this.subscription.add(
      this.sessionService
        .create(game.id, this.user.id, game.gameSettings[0].id, this.elapsedTime)
        .subscribe(response => {
          console.log(response);
        })
    );
  }

  addRecipe(recipe: Recipe) {
    this.chosenRecipes.push(recipe);
    this.setCanContinue();
  }

  setCanContinue() {
    this.canContinue = true;
  }

  handleError(error: string) {
    const message = new ToastWrapper(error, ToastPosition.TOP, HttpResponseMessageSeverity.DANGER);
    message.alert();
    this.canContinue = false;
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

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
}
