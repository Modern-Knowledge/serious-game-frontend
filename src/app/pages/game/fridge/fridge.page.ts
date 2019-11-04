import { Component, OnInit, Input } from "@angular/core";
import { IngredientService } from "src/app/providers/ingredient.service";
import { Ingredient } from "src/lib/models/Ingredient";
import { Subscription, Observable } from "rxjs";
import { FridgeStoreService } from "src/app/providers/store/fridge-store.service";

@Component({
  selector: "serious-game-fridge",
  templateUrl: "./fridge.page.html",
  styleUrls: ["./fridge.page.scss"]
})
export class FridgePage {
  private ingredients: Ingredient[];
  private subscription: Subscription = new Subscription();

  constructor(
    private ingredientService: IngredientService,
    private fridgeStore: FridgeStoreService
  ) {}

  ionViewWillEnter() {
    this.subscription.add(
      this.fridgeStore.items$.subscribe(items => {
        if (this.fridgeStore.getAlreadyRandomized()) {
          this.ingredients = items;
        } else {
          this.getRandomIngredients();
        }
      })
    );
  }

  /**
   * gets random ingredients from the backend and stores them in the fridge
   */
  getRandomIngredients() {
    this.subscription.add(
      this.ingredientService.getAll().subscribe(ingredients => {
        if (!this.fridgeStore.getAlreadyRandomized()) {
          const randomizedIngredients = this.dropRandomItems(ingredients);
          this.ingredients = randomizedIngredients;
          this.fridgeStore.addItems(randomizedIngredients);
          this.fridgeStore.setAlreadyRandomized(true);
        }
      })
    );
  }

  /**
   * drops random items from an array
   * @param items
   */
  dropRandomItems(items: any[]) {
    let dropAmount = Math.floor(Math.random() * items.length);
    for (dropAmount; dropAmount <= items.length; dropAmount++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      items.splice(randomIndex, 1);
    }
    return items;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
