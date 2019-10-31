import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/lib/models/Recipe";
import { Game } from "src/lib/models/Game";
import { GameComponent } from "../game.component";
import { Errortext } from "src/lib/models/Errortext";

@Component({
  selector: "serious-game-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent implements OnInit, GameComponent {
  @Input() data: Recipe[];
  @Input() game: Game;
  @Input() errorTexts: Errortext[];
  @Output() event: EventEmitter<any> = new EventEmitter();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter();
  chosenRecipe: Recipe;

  constructor() {}

  ngOnInit() {
    this.chosenRecipe = this.chooseRandomRecipe();
  }

  chooseRandomRecipe() {
    return this.data[Math.floor(Math.random() * this.data.length)];
  }
}
