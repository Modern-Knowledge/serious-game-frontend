import { Component, OnInit, Input } from "@angular/core";
import { Game } from "src/lib/models/Game";
import { IngredientService } from "src/app/providers/ingredient.service";
import { Ingredient } from "src/lib/models/Ingredient";

@Component({
  selector: "serious-game-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit {
  @Input() game: Game;
  @Input() words: String[];
  ingredients: Ingredient[];

  constructor(private ingredientService: IngredientService) {
    this.ingredientService.getAll().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  ngOnInit() {}
}
