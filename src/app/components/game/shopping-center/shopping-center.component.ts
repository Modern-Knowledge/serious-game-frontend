import { Component, OnInit, Input } from "@angular/core";
import { Game } from "src/lib/models/Game";
import { Ingredient } from "src/lib/models/Ingredient";
import { IngredientService } from "src/app/providers/ingredient.service";
import { Word } from "src/lib/models/Word";

@Component({
  selector: "serious-game-shopping-center",
  templateUrl: "./shopping-center.component.html",
  styleUrls: ["./shopping-center.component.scss"]
})
export class ShoppingCenterComponent implements OnInit {
  @Input() game: Game;

  shoppingCart: Ingredient[];
  availableItems: (Ingredient | Word)[];

  constructor(private ingredientService: IngredientService) {}

  ngOnInit() {}
}
