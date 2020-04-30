import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IonContent } from "@ionic/angular";
import { Subject, Subscription } from "rxjs";
import { MealtimeStoreService } from "src/app/providers/store/mealtime-store.service";
import { Errortexts } from "serious-game-library/dist/enums/Errortexts";
import { Mealtimes } from "serious-game-library/dist/enums/Mealtimes";
import { Errortext } from "serious-game-library/dist/models/Errortext";
import { Game } from "serious-game-library/dist/models/Game";
import { Recipe } from "serious-game-library/dist/models/Recipe";
import { Word } from "serious-game-library/dist/models/Word";
import { getErrorText } from "serious-game-library/dist/utils/errorTextHelper";

import { IGameComponent } from "../game.component";

@Component({
    selector: "serious-game-day-planning",
    styleUrls: ["./day-planning.component.scss"],
    templateUrl: "./day-planning.component.html"
})
export class DayPlanningComponent implements IGameComponent, OnInit {
    @Input() public data: Array<Recipe | Word>;
    @Input() public game: Game;
    @Input() public errorTexts: Errortext[];
    @Input() public mainGameSubject: Subject<any>;
    @Input() public scrollContainer: IonContent;
    @Output() public event: EventEmitter<Recipe> = new EventEmitter<Recipe>();
    @Output() public errorEvent: EventEmitter<any> = new EventEmitter<any>();

    // tslint:disable-next-line: variable-name
    public Mealtimes: Mealtimes;
    public breakfast: Mealtimes = Mealtimes.BREAKFAST;
    public lunch: Mealtimes = Mealtimes.LUNCH;
    public dinner: Mealtimes = Mealtimes.DINNER;

    private subscription: Subscription = new Subscription();

    public constructor(private mealtimeStorage: MealtimeStoreService) {}

    /**
     * Subscribes to the mainGameSubject event which is emitted when pressing next.
     */
    public ngOnInit() {
        this.subscription.add(
            this.mainGameSubject.subscribe(() => {
                if (this.validMealtimes() === true) {
                    this.event.emit();
                } else {
                    const errorText = getErrorText(
                        this.errorTexts,
                        Errortexts.DAY_PLANNING
                    );
                    this.errorEvent.emit(errorText);
                }
            })
        );
    }

    /**
     * Emits the event to add a recipe.
     */
    public addRecipe(value: Recipe) {
        this.event.emit(value);
    }

    /**
     * Emits the error event.
     */
    public showError(errortext: Errortext) {
        this.errorEvent.emit(errortext);
    }

    public doReorder(event: any) {
        event.detail.complete();
    }

    /**
     * Unsubscribes to the mainGameSubject on destroy.
     */
    public cleanupResources() {
        this.subscription.unsubscribe();
        this.mealtimeStorage.clearItems();
    }
    /**
     * Checks whether all recipes that are currently set have the correct mealtime assigned.
     * If no mealtime is set, returns false.
     * @returns Whether all recipes that are currently set have the correct mealtime assigned.
     */
    private validMealtimes() {
        if (this.mealtimeStorage.items.size <= 0) {
            return false;
        }
        for (const [mealtime, recipe] of this.mealtimeStorage.items.entries()) {
            if (mealtime !== recipe.mealtime) {
                return false;
            }
        }
        return true;
    }
}
