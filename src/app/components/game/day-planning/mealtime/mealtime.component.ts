import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/lib/models/Recipe";

@Component({
  selector: "serious-game-mealtime",
  templateUrl: "./mealtime.component.html",
  styleUrls: ["./mealtime.component.scss"]
})
export class MealtimeComponent implements OnInit {
  @Input() model: string;
  @Output() recipeAdded: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  constructor() {}

  ngOnInit() {}

  addRecipe(value: Recipe) {
    this.recipeAdded.emit(value);
  }
}
