import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Mealtimes } from "src/lib/enums/Mealtimes";
import { Errortext } from "src/lib/models/Errortext";
import { Recipe } from "src/lib/models/Recipe";
import { TemplateParser } from "src/lib/utils/TemplateParser";

@Component({
    selector: "serious-game-mealtime",
    styleUrls: ["./mealtime.component.scss"],
    templateUrl: "./mealtime.component.html"
})
export class MealtimeComponent {
    @Input() public title: string;
    @Input() public model: string;
    @Input() public mealtime: Mealtimes;
    @Input() public errorTexts: Errortext[];
    @Output() public event: EventEmitter<Recipe> = new EventEmitter<Recipe>();
    @Output() public errorEvent: EventEmitter<any> = new EventEmitter<any>();
    private templateParser: TemplateParser = new TemplateParser();
    constructor(private dragulaService: DragulaService) {}

    public addRecipe(value: Recipe) {
        if (this.matchMealtimes(value.mealtime)) {
            this.event.emit(value);
        } else {
            const mealTimeErrorText: Errortext = new Errortext().deserialize(
                this.errorTexts.find(
                    (errorText: Errortext) => errorText.name === "mealtime"
                )
            );
            this.dragulaService.find("recipes").drake.cancel(true);

            mealTimeErrorText.text = this.templateParser.parse(
                mealTimeErrorText.text,
                [value.name, this.mealtime]
            );
            this.errorEvent.emit(mealTimeErrorText);
        }
    }

    public matchMealtimes(mealtime: Mealtimes): boolean {
        return this.mealtime === mealtime;
    }
}
