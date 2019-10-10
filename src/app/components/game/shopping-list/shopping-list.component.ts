import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Game } from "src/lib/models/Game";
import { IngredientService } from "src/app/providers/ingredient.service";
import { Ingredient } from "src/lib/models/Ingredient";
import { GameComponent } from "../game.component";
import { Word } from "src/lib/models/Word";
import { Recipe } from "src/lib/models/Recipe";

@Component({
  selector: "serious-game-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit, GameComponent {
  @Input() game: Game;
  @Input() data: (Recipe | Word)[];
  @Output() event: EventEmitter<any> = new EventEmitter();
  ingredients: Ingredient[];

  constructor(private ingredientService: IngredientService) {
    this.ingredientService.getAll().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  ngOnInit() {}
}
