import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IngredientService } from "src/app/providers/ingredient.service";
import { Ingredient } from "src/lib/models/Ingredient";
import { forkJoin } from "rxjs";
import { FoodCategoryService } from "src/app/providers/food-category.service";
import { FoodCategory } from "src/lib/models/FoodCategory";

@Component({
  selector: "serious-game-shelf",
  templateUrl: "./shelf.page.html",
  styleUrls: ["./shelf.page.scss"]
})
export class ShelfPage {
  private foodItems: Ingredient[];
  public foodCategory: FoodCategory;

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private foodCategoryService: FoodCategoryService
  ) {}

  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      this.foodCategoryService
        .get(+params.get("id"))
        .subscribe(foodCategory => (this.foodCategory = foodCategory));
      this.ingredientService
        .getByFoodCategory(+params.get("id"))
        .subscribe(ingredients => {
          this.foodItems = ingredients;
        });
    });
  }
}
