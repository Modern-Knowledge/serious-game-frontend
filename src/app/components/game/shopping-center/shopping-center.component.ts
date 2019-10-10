import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Game } from "src/lib/models/Game";
import { Ingredient } from "src/lib/models/Ingredient";
import { IngredientService } from "src/app/providers/ingredient.service";
import { Word } from "src/lib/models/Word";
import { GameComponent } from "../game.component";

@Component({
  selector: "serious-game-shopping-center",
  templateUrl: "./shopping-center.component.html",
  styleUrls: ["./shopping-center.component.scss"]
})
export class ShoppingCenterComponent implements OnInit, GameComponent {
  @Input() data: Ingredient[];
  @Input() game: Game;
  @Output() event: EventEmitter<any> = new EventEmitter();

  shoppingCart: Ingredient[];
  availableItems: (Ingredient | Word)[];

  constructor() {}

  ngOnInit() {}
}
