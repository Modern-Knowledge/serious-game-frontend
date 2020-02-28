import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Subscription } from "rxjs";
import { MealtimeStoreService } from "src/app/providers/store/mealtime-store.service";
import { Errortexts } from "src/lib/enums/Errortexts";
import { Mealtimes } from "src/lib/enums/Mealtimes";
import { Errortext } from "src/lib/models/Errortext";
import { Recipe } from "src/lib/models/Recipe";
import { getErrorText } from "src/lib/utils/errorTextHelper";
import { TemplateParser } from "src/lib/utils/TemplateParser";

@Component({
    selector: "serious-game-mealtime",
    styleUrls: ["./mealtime.component.scss"],
    templateUrl: "./mealtime.component.html"
})
export class MealtimeComponent implements OnInit {
    @Input() public title: string;
    @Input() public model: Recipe[];
    @Input() public mealtime: Mealtimes;
    @Input() public errorTexts: Errortext[];
    @Output() public event: EventEmitter<Recipe> = new EventEmitter<Recipe>();
    @Output() public errorEvent: EventEmitter<any> = new EventEmitter<any>();
    private templateParser: TemplateParser = new TemplateParser();
    private subscription: Subscription = new Subscription();
    constructor(
        private dragulaService: DragulaService,
        private mealtimeStorage: MealtimeStoreService
    ) {}

    public ngOnInit() {
        this.subscription.add(
            this.dragulaService.dropModel("recipes").subscribe((value) => {
                const item = this.model.find(
                    (element) => element.id === +value.el.id
                );
                if (
                    value.target.id === "recipe-drag" &&
                    item.mealtime === this.mealtime
                ) {
                    this.mealtimeStorage.emptyMealtime(this.mealtime);
                }
            })
        );
    }

    /**
     * If the passed recipe matches with the mealtime, it is added to the global mealtime storage
     * and the addItem event is emitted.
     * @param value - The recipe to be added.
     * @returns - Whether the recipe was successfully added.
     */
    public addRecipe(value: Recipe) {
        if (
            this.matchMealtimes(value.mealtime) === true &&
            this.mealTimeEmpty() === true
        ) {
            this.mealtimeStorage.addItem(value, this.mealtime);
            this.event.emit(value);
            return true;
        } else {
            let mealTimeErrorText: Errortext;
            if (this.matchMealtimes(value.mealtime) === false) {
                mealTimeErrorText = getErrorText(
                    this.errorTexts,
                    Errortexts.MEALTIME
                );
                mealTimeErrorText.text = this.templateParser.parse(
                    mealTimeErrorText.text,
                    [value.name, this.mealtime]
                );
            } else if (this.mealTimeEmpty() === false) {
                mealTimeErrorText = getErrorText(
                    this.errorTexts,
                    Errortexts.MEALTIME_FILLED
                );
                mealTimeErrorText.text = this.templateParser.parse(
                    mealTimeErrorText.text,
                    [this.mealtime]
                );
            }

            this.dragulaService.find("recipes").drake.cancel(true);

            this.errorEvent.emit(mealTimeErrorText);
            return false;
        }
    }

    public mealTimeEmpty(): boolean {
        return this.mealtimeStorage.items.get(this.mealtime) === undefined;
    }

    /**
     * Checks if the given mealtime has the correct mealtime.
     * @returns Whether the recipe matches this mealtime.
     */
    public matchMealtimes(mealtime: Mealtimes): boolean {
        return this.mealtime === mealtime;
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
