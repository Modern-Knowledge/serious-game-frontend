import { Component, OnInit, Input } from '@angular/core';
import { IngredientService } from 'src/app/providers/ingredient.service';
import { Ingredient } from 'src/lib/models/Ingredient';

@Component({
  selector: 'serious-game-fridge',
  templateUrl: './fridge.page.html',
  styleUrls: ['./fridge.page.scss'],
})
export class FridgePage {

  @Input() ingredients: Ingredient[];

  constructor(private ingredientService: IngredientService) { }

  ionViewWillEnter() {
    this.ingredientService.getAll().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }
}
