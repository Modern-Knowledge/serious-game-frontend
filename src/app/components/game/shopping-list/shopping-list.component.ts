import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subject, Subscription } from 'rxjs';
import { IngredientService } from 'src/app/providers/ingredient.service';
import { FridgeStoreService } from 'src/app/providers/store/fridge-store.service';
import { RecipeStoreService } from 'src/app/providers/store/recipe-store.service';
import { ShoppingListStoreService } from 'src/app/providers/store/shopping-list-store.service';
import { Errortext } from 'src/lib/models/Errortext';
import { Game } from 'src/lib/models/Game';
import { Ingredient } from 'src/lib/models/Ingredient';
import { Recipe } from 'src/lib/models/Recipe';
import { Word } from 'src/lib/models/Word';

import { GameComponent } from '../game.component';

@Component({
  selector: 'serious-game-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, GameComponent {
  @Input() game: Game;
  @Input() data: (Recipe | Word)[];
  @Input() errorTexts: Errortext[];
  @Input() mainGameSubject: Subject<any>;
  @Output() event: EventEmitter<any> = new EventEmitter();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter();
  private name = 'shoppinglist';
  private ingredients: Ingredient[];
  private subscription: Subscription = new Subscription();
  private shoppingListItems: Ingredient[];
  private fridgeItems: Ingredient[];
  private itemsValid = false;

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
      })
    );
    this.subscription.add(
      this.dragulaService.dropModel(this.name).subscribe(value => {
        const item = this.data.find(element => element.id === +value.el.id);
        if (value.target.id === 'drag') {
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
      this.errorEvent.emit(`Sehen Sie zuerst nach, was im Kühlschrank vorhanden ist!`);
    } else if (!this.validShoppingListItem(item)) {
      this.errorEvent.emit(`${item.name} ist bereits im Kühlschrank vorhanden!`);
    } else {
      this.shoppingListStore.addItem(item);
      if (this.compareShoppingListWithRecipe()) {
        this.event.emit();
      }
    }
  }

  /**
   * compares the ingredients defined in the recipe with the items
   * of the fridge + the items in the shopping list
   * @return whether the shopping list contains every needed item or not
   */
  compareShoppingListWithRecipe(): boolean {
    this.recipeStore.currentRecipe.ingredients.map(ingredient => {
      this.itemsValid =
        this.shoppingListItems
          .concat(this.fridgeItems)
          .findIndex(recipeIngredient => recipeIngredient.id === ingredient.id) > -1;
    });
    return this.itemsValid;
  }

  /**
   * removes item from the shopping list
   * @param item Ingredient|Word
   */
  removeItem(item) {
    this.shoppingListStore.removeItem(item);
    if (this.compareShoppingListWithRecipe()) {
      this.event.emit();
    }
  }

  /**
   * checks if item added to the shopping list is valid
   * @param item Ingredient|Word
   */
  validShoppingListItem(item: Ingredient | Word): boolean {
    return this.fridgeItems.findIndex(fridgeItem => fridgeItem.id === item.id) === -1;
  }
}
