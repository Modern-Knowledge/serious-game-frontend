import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { IonContent } from "@ionic/angular";
import { forkJoin, Observable, Subject, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { DayPlanningComponent } from "src/app/components/game/day-planning/day-planning.component";
import { IGameComponent } from "src/app/components/game/game.component";
import { RecipeComponent } from "src/app/components/game/recipe/recipe.component";
import { ShoppingCenterComponent } from "src/app/components/game/shopping-center/shopping-center.component";
import { ShoppingListComponent } from "src/app/components/game/shopping-list/shopping-list.component";
import { ErrorCountComponent } from "src/app/components/shared/error-count/error-count.component";
import { StopwatchComponent } from "src/app/components/shared/stopwatch/stopwatch.component";
import { ComponentIsDirective } from "src/app/directives/component-is.directive";
import { ErrorTextService } from "src/app/providers/error-text.service";
import { GameService } from "src/app/providers/game.service";
import { IngredientService } from "src/app/providers/ingredient.service";
import { RecipeService } from "src/app/providers/recipe.service";
import { SessionService } from "src/app/providers/session.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { ToastPosition, ToastWrapper } from "src/app/util/ToastWrapper";
import { Errortext } from "src/lib/models/Errortext";
import { Game } from "src/lib/models/Game";
import { Ingredient } from "src/lib/models/Ingredient";
import { Patient } from "src/lib/models/Patient";
import { Recipe } from "src/lib/models/Recipe";
import { Therapist } from "src/lib/models/Therapist";
import { Word } from "src/lib/models/Word";
import { HttpResponseMessageSeverity } from "src/lib/utils/http/HttpResponse";

@Component({
    selector: "serious-game-game",
    styleUrls: ["./game.page.scss"],
    templateUrl: "./game.page.html"
})
export class GamePage {
    @ViewChild(StopwatchComponent, { static: false })
    public stopWatch: StopwatchComponent;
    @ViewChild(ComponentIsDirective, { static: false })
    public componentIs: ComponentIsDirective;
    @ViewChild(ErrorCountComponent, { static: false })
    public errorCount: ErrorCountComponent;

    @ViewChild("scrollContainer", { static: false }) content: IonContent;

    public user: Therapist | Patient;
    public games: Game[];
    public step: number;
    private dayPlanningData: Array<Word | Recipe>;
    private chosenRecipes: Recipe[] = [];
    private shoppingCenterData: Array<Word | Ingredient>;
    private elapsedTime: number;
    private gameComponents;
    private subscription: Subscription = new Subscription();
    private sessionErrorTexts: Errortext[] = [];
    private canContinue: boolean;
    private mainGameSubject: Subject<any> = new Subject();
    private dynamicComponentInstances = [];

    /**
     * @param wordService word service
     * @param recipeService recipe service
     * @param gameService game service
     * @param componentFactoryResolver component-factory resolver
     * @param ingredientService ingredient-service
     * @param sessionService session-service
     * @param router application service
     * @param userStore user store
     * @param errorTextService error-text service
     */
    constructor(
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

    /**
     * Function that is executed, when the view is entered.
     * First it loads the authenticated user. Afterwards it loads the
     * recipes, games and ingredients.
     */
    public ionViewWillEnter() {
        this.subscription.add(
            this.userStore.user.subscribe((user) => {
                this.user = user;
            })
        );
        this.subscription.add(
            this.requestMultipleResources().subscribe((responseList) => {
                this.dayPlanningData = responseList[0];
                this.games = responseList[1];
                this.shoppingCenterData = responseList[2];
                this.loadGame();
            })
        );
    }

    /**
     * Requests all recipes, games and ingredients.
     * Afterwards it joins the three results to an array.
     */
    public requestMultipleResources(): Observable<any[]> {
        const dayPlanningData = this.recipeService.getAll();
        const games = this.gameService.getAll();
        const shoppingCenterData = this.ingredientService.getAll();

        return forkJoin([dayPlanningData, games, shoppingCenterData]);
    }

    /**
     *
     */
    public loadGame() {
        this.gameComponents = {
            "serious-game-day-planning": {
                callback: "addRecipe",
                canContinue: false,
                data: this.dayPlanningData,
                type: DayPlanningComponent
            },
            "serious-game-recipe": {
                canContinue: true,
                data: this.chosenRecipes,
                type: RecipeComponent
            },
            "serious-game-shopping-list": {
                callback: "setCanContinue",
                canContinue: false,
                data: this.shoppingCenterData,
                type: ShoppingListComponent
            },
            // tslint:disable-next-line: object-literal-sort-keys
            "serious-game-shopping-center": {
                callback: "setCanContinue",
                canContinue: false,
                data: this.shoppingCenterData,
                type: ShoppingCenterComponent
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
        const dynamicComponentInstance = componentRef.instance as IGameComponent;
        dynamicComponentInstance.data = currentGameComponent.data;
        dynamicComponentInstance.game = currentGame;
        dynamicComponentInstance.scrollContainer = this.content;
        dynamicComponentInstance.mainGameSubject = this.mainGameSubject;
        dynamicComponentInstance.errorTexts = currentGame.errortexts;
        dynamicComponentInstance.event.subscribe((event) => {
            if (currentGameComponent.callback) {
                this[currentGameComponent.callback](event);
            }
        });

        dynamicComponentInstance.errorEvent.subscribe((error) => {
            this.handleError(error);
        });
        this.dynamicComponentInstances.push(dynamicComponentInstance);
        this.canContinue = currentGameComponent.canContinue;
    }

    /**
     *
     */
    public onSubmit() {
        this.mainGameSubject.next();
        if (this.canContinue) {
            this.stopWatch.reset();
            this.errorCount.reset();
            this.storeSession();
            this.step++;
            this.canContinue = false;
            this.loadGame();
        }
    }

    /**
     *
     */
    public onFinish() {
        this.mainGameSubject.next();
        if (this.canContinue) {
            this.stopWatch.reset();
            this.errorCount.reset();
            this.storeSession();
            this.step = 0;
            this.cleanupResources();
            const message = new ToastWrapper(
                "Das Spiel wurde erfolgreich abgeschlossen!",
                ToastPosition.TOP,
                HttpResponseMessageSeverity.SUCCESS
            );
            message.alert();
            this.router.navigateByUrl("/main-menu");
        }
    }

    /**
     * Creates a session from the current user, game, game-settings, elapsed time.
     */
    public storeSession() {
        const game = this.games[this.step];

        const sessionResponse$ = this.sessionService.create(
            game.id,
            this.user.id,
            game.gameSettings[0].id,
            this.elapsedTime
        );

        sessionResponse$
            .pipe(
                switchMap((session) => {
                    const sessionData = session;
                    return this.errorTextService.bulkCreate(
                        this.sessionErrorTexts,
                        sessionData
                    );
                })
            )
            .subscribe();
    }

    public cleanupResources() {
        this.subscription.unsubscribe();
        this.dynamicComponentInstances.forEach((instance) => {
            instance.cleanupResources();
        });
    }

    /**
     * Adds a recipe to the chosen recipes.
     *
     * @param recipe recipe to add to the chosen recipes
     */
    public addRecipe(recipe: Recipe) {
        if (recipe) {
            this.chosenRecipes.push(recipe);
            this.setCanContinue();
        }
    }

    /**
     * Sets the variable canContinue to true.
     */
    public setCanContinue() {
        this.canContinue = true;
    }

    /**
     * Creates an toast for the received error-message. Increases the errorCount and forbids the user to continue.
     * @param errortext error-text that should be handled
     */
    public handleError(errortext: Errortext) {
        if (errortext) {
            const message = new ToastWrapper(
                errortext.text,
                ToastPosition.TOP,
                HttpResponseMessageSeverity.DANGER
            );
            message.alert();
            this.canContinue = false;
            this.errorCount.increaseCount();
            this.addErrorText(errortext);
        }
    }

    /**
     * Adds an error-text to the already stored errotexts by the session.
     *
     * @param errortext error-text to add
     */
    public addErrorText(errortext: Errortext): void {
        this.sessionErrorTexts.push(errortext);
    }

    /**
     * Checks if the current step of the game is still in the boundaries
     */
    public stepValid(): boolean {
        if (this.games) {
            return this.step < this.games.length - 1;
        }
        return false;
    }

    /**
     * Sets the elapsed time.
     * @param time time to set
     */
    public setTime(time: number): void {
        this.elapsedTime = time;
    }

    /**
     * Executed, when the view is left
     */
    public ionViewDidLeave(): void {
        this.subscription.unsubscribe();
    }
}
