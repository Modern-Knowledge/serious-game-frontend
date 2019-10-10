import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/lib/models/Recipe";
import { Game } from "src/lib/models/Game";
import { Mealtimes } from "src/lib/enums/Mealtimes";
import { Word } from "src/lib/models/Word";
import { GameComponent } from "../game.component";

@Component({
  selector: "serious-game-day-planning",
  templateUrl: "./day-planning.component.html",
  styleUrls: ["./day-planning.component.scss"]
})
export class DayPlanningComponent implements OnInit, GameComponent {
  constructor() {}

  @Input() data: (Recipe | Word)[];
  @Input() game: Game;
  @Output() event: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  ngOnInit() {}

  addRecipe(value: Recipe) {
    this.event.emit(value);
  }

  doReorder(event: any) {
    event.detail.complete();
  }
}
