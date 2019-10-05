import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/lib/models/Recipe";
import { Game } from "src/lib/models/Game";
import { Mealtimes } from "src/lib/enums/Mealtimes";

@Component({
  selector: "serious-game-day-planning",
  templateUrl: "./day-planning.component.html",
  styleUrls: ["./day-planning.component.scss"]
})
export class DayPlanningComponent implements OnInit {
  constructor() {}

  @Input() words: String[];
  @Input() game: Game;
  @Output() recipeAdded: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  ngOnInit() {}

  addRecipe(value: Recipe) {
    this.recipeAdded.emit(value);
  }

  doReorder(event: any) {
    event.detail.complete();
  }
}
