import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Game } from "src/lib/models/Game";
import { Ingredient } from "src/lib/models/Ingredient";
import { Word } from "src/lib/models/Word";
import { GameComponent } from "../game.component";
import { FoodCategory } from "src/lib/models/FoodCategory";
import { FoodCategoryService } from "src/app/providers/food-category.service";
import { Observable } from "rxjs";
import { Errortext } from "src/lib/models/Errortext";
import { ShoppingListStoreService } from "src/app/providers/store/shopping-list-store.service";

@Component({
  selector: "serious-game-shopping-center",
  templateUrl: "./shopping-center.component.html",
  styleUrls: ["./shopping-center.component.scss"]
})
export class ShoppingCenterComponent implements OnInit, GameComponent {
  @Input() data: Ingredient[];
  @Input() game: Game;
  @Input() errorTexts: Errortext[];
  @Output() event: EventEmitter<any> = new EventEmitter();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter();

  private shoppingCart: Ingredient[];
  private availableItems: (Ingredient | Word)[];
  private shelves: Observable<FoodCategory[]>;
  private validShoppingCart: boolean = false;

  constructor(
    private foodCategoryService: FoodCategoryService,
    private shoppingListStore: ShoppingListStoreService
  ) {
    this.shelves = this.foodCategoryService.getAll();
  }

  ngOnInit() {
    if (this.shoppingCart) {
      if (this.shoppingCartIsValid()) {
        this.event.emit();
      } else {
        this.errorEvent.emit("Der Inhalt des Einkaufswagens ist nicht gültig!");
      }
    }
  }

  /**
   * check if the shopping cart is valid
   */
  shoppingCartIsValid(): boolean {
    this.shoppingListStore.items.map(item => {
      this.validShoppingCart =
        this.shoppingCart.findIndex(
          shoppingCartItem => shoppingCartItem.id === item.id
        ) > -1;
    });
    console.log(this.validShoppingCart);
    return this.validShoppingCart;
  }
}
