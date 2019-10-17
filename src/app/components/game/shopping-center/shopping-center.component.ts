import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Game } from "src/lib/models/Game";
import { Ingredient } from "src/lib/models/Ingredient";
import { Word } from "src/lib/models/Word";
import { GameComponent } from "../game.component";
import { FoodCategory } from "src/lib/models/FoodCategory";
import { FoodCategoryService } from "src/app/providers/food-category.service";
import { CartStoreService } from "src/app/providers/store/cart-store.service";

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
  shelves: FoodCategory[];

  constructor(
    private foodCategoryService: FoodCategoryService,
    private cartStore: CartStoreService
  ) {
    this.foodCategoryService.getAll().subscribe(foodCategories => {
      this.shelves = foodCategories;
    });
  }

  ngOnInit() {}
}
