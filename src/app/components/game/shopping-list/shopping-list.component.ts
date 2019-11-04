import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Game } from "src/lib/models/Game";
import { IngredientService } from "src/app/providers/ingredient.service";
import { Ingredient } from "src/lib/models/Ingredient";
import { GameComponent } from "../game.component";
import { Word } from "src/lib/models/Word";
import { Recipe } from "src/lib/models/Recipe";
import { Observable, Subscription } from "rxjs";
import { Errortext } from "src/lib/models/Errortext";
import { ShoppingListStoreService } from "src/app/providers/store/shopping-list-store.service";
import { DragulaService } from "ng2-dragula";
import { FridgeStoreService } from "src/app/providers/store/fridge-store.service";
import { RecipeStoreService } from "src/app/providers/store/recipe-store.service";

@Component({
  selector: "serious-game-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit, GameComponent {
  @Input() game: Game;
  @Input() data: (Recipe | Word)[];
  @Input() errorTexts: Errortext[];
  @Output() event: EventEmitter<any> = new EventEmitter();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter();
  private name: string = "shoppinglist";
  private ingredients: Ingredient[];
  private subscription: Subscription = new Subscription();
  private shoppingListItems: Ingredient[];
  private fridgeItems: Ingredient[];
  private itemsValid: boolean = false;

  constructor(
    private ingredientService: IngredientService,
    private shoppingListStore: ShoppingListStoreService,
    private dragulaService: DragulaService,
    private fridgeStore: FridgeStoreService,
    private recipeStore: RecipeStoreService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.ingredientService.getAll().subscribe(ingredient => {
        this.ingredients = ingredient;
        this;
      })
    );
    this.subscription.add(
      this.dragulaService.dropModel(this.name).subscribe(value => {
        const item = this.data.find(element => element.id === +value.el.id);
        if (value.target.id === "drag") {
          this.removeItem(item);
        } else {
          this.addItem(item);
          this.dragulaService.find(this.name).drake.cancel(true);
        }
      })
    );
    this.subscription.add(
      this.shoppingListStore.items$.subscribe(items => {
        this.shoppingListItems = items;
      })
    );
    this.subscription.add(
      this.fridgeStore.items$.subscribe(items => {
        this.fridgeItems = items;
      })
    );
  }
  /**
   * adds item to shopping list
   * @param item Ingredient|Word
   */
  addItem(item) {
    if (!this.fridgeStore.alreadyRandomized) {
      this.errorEvent.emit(
        `Sehen Sie zuerst nach, was im Kühlschrank vorhanden ist!`
      );
    } else if (!this.validShoppingListItem(item)) {
      this.errorEvent.emit(
        `${item.name} ist bereits im Kühlschrank vorhanden!`
      );
    } else {
      this.shoppingListStore.addItem(item);
      this.shoppingListItems.concat(this.fridgeItems).map(ingredient => {
        if (
          this.recipeStore.currentRecipe.ingredients.find(
            recipeIngredient => recipeIngredient.id === ingredient.id
          )
        ) {
          this.event.emit();
        } else {
          this.errorEvent.emit(`Die Einkaufsliste enthält ungültige Zutaten!`);
        }
      });
    }
  }

  /**
   * removes item from the shopping list
   * @param item Ingredient|Word
   */
  removeItem(item) {
    this.shoppingListStore.removeItem(item);
  }

  /**
   * checks if item added to the shopping list is valid
   * @param item Ingredient|Word
   */
  validShoppingListItem(item: Ingredient | Word): boolean {
    return (
      this.fridgeItems.findIndex(fridgeItem => fridgeItem.id === item.id) === -1
    );
  }
}
