import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/lib/models/Recipe";
import { Game } from "src/lib/models/Game";
import { Mealtimes } from "src/lib/enums/Mealtimes";
import { Word } from "src/lib/models/Word";
import { GameComponent } from "../game.component";
import { Errortext } from "src/lib/models/Errortext";

@Component({
  selector: "serious-game-day-planning",
  templateUrl: "./day-planning.component.html",
  styleUrls: ["./day-planning.component.scss"]
})
export class DayPlanningComponent implements OnInit, GameComponent {
  @Input() data: (Recipe | Word)[];
  @Input() game: Game;
  @Input() errorTexts: Errortext[];
  @Output() event: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter<any>();

  Mealtimes: Mealtimes;
  breakfast: Mealtimes = Mealtimes.BREAKFAST;
  lunch: Mealtimes = Mealtimes.LUNCH;
  dinner: Mealtimes = Mealtimes.DINNER;

  constructor() {}

  ngOnInit() {}

  addRecipe(value: Recipe) {
    this.event.emit(value);
  }

  showError(error) {
    this.errorEvent.emit(error);
  }

  doReorder(event: any) {
    event.detail.complete();
  }
}
