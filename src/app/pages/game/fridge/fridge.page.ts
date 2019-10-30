import { Component, OnInit, Input } from "@angular/core";
import { IngredientService } from "src/app/providers/ingredient.service";
import { Ingredient } from "src/lib/models/Ingredient";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "serious-game-fridge",
  templateUrl: "./fridge.page.html",
  styleUrls: ["./fridge.page.scss"]
})
export class FridgePage {
  @Input() ingredients: Observable<Ingredient[]>;
  private subscription: Subscription = new Subscription();

  constructor(private ingredientService: IngredientService) {}

  ionViewWillEnter() {
    this.ingredients = this.ingredientService.getAll();
  }
}
