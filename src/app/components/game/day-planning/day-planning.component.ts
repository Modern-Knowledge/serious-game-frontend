import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subject } from "rxjs";
import { Mealtimes } from "src/lib/enums/Mealtimes";
import { Errortext } from "src/lib/models/Errortext";
import { Game } from "src/lib/models/Game";
import { Recipe } from "src/lib/models/Recipe";
import { Word } from "src/lib/models/Word";

import { IGameComponent } from "../game.component";

@Component({
    selector: "serious-game-day-planning",
    styleUrls: ["./day-planning.component.scss"],
    templateUrl: "./day-planning.component.html"
})
export class DayPlanningComponent implements IGameComponent {
    @Input() public data: Array<Recipe | Word>;
    @Input() public game: Game;
    @Input() public errorTexts: Errortext[];
    @Input() public mainGameSubject: Subject<any>;
    @Output() public event: EventEmitter<Recipe> = new EventEmitter<Recipe>();
    @Output() public errorEvent: EventEmitter<any> = new EventEmitter<any>();

    // tslint:disable-next-line: variable-name
    public Mealtimes: Mealtimes;
    public breakfast: Mealtimes = Mealtimes.BREAKFAST;
    public lunch: Mealtimes = Mealtimes.LUNCH;
    public dinner: Mealtimes = Mealtimes.DINNER;

    public addRecipe(value: Recipe) {
        this.event.emit(value);
    }

    public showError(errortext: Errortext) {
        this.errorEvent.emit(errortext);
    }

    public doReorder(event: any) {
        event.detail.complete();
    }
}
