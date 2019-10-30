import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IngredientService } from "src/app/providers/ingredient.service";
import { Ingredient } from "src/lib/models/Ingredient";
import { forkJoin, Subscription } from "rxjs";
import { FoodCategoryService } from "src/app/providers/food-category.service";
import { FoodCategory } from "src/lib/models/FoodCategory";
import { CartStoreService } from "src/app/providers/store/cart-store.service";

@Component({
  selector: "serious-game-shelf",
  templateUrl: "./shelf.page.html",
  styleUrls: ["./shelf.page.scss"]
})
export class ShelfPage {
  private foodItems: Ingredient[];
  public foodCategory: FoodCategory;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private foodCategoryService: FoodCategoryService,
    private cartStore: CartStoreService
  ) {}

  ionViewWillEnter() {
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        this.foodCategoryService
          .get(+params.get("id"))
          .subscribe(foodCategory => (this.foodCategory = foodCategory));
        this.ingredientService
          .getByFoodCategory(+params.get("id"))
          .subscribe(ingredients => {
            this.foodItems = ingredients;
          });
      })
    );
  }
  doReorder(event: any) {
    event.detail.complete();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
