import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, Subscription } from "rxjs";
import { FoodCategoryService } from "src/app/providers/food-category.service";
import { IngredientService } from "src/app/providers/ingredient.service";
import { CartStoreService } from "src/app/providers/store/cart-store.service";
import { FoodCategory } from "src/lib/models/FoodCategory";
import { Ingredient } from "src/lib/models/Ingredient";

@Component({
  selector: "serious-game-shelf",
  templateUrl: "./shelf.page.html",
  styleUrls: ["./shelf.page.scss"]
})
export class ShelfPage {
  public foodCategory: FoodCategory;
  private foodItems: Ingredient[];
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private foodCategoryService: FoodCategoryService,
    private cartStore: CartStoreService
  ) {}

  public ionViewWillEnter() {
    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        this.foodCategoryService
          .get(+params.get("id"))
          .subscribe((foodCategory) => (this.foodCategory = foodCategory));
        this.ingredientService
          .getByFoodCategory(+params.get("id"))
          .subscribe((ingredients) => {
            this.foodItems = ingredients;
          });
      })
    );
  }
  public doReorder(event: any) {
    event.detail.complete();
  }
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
