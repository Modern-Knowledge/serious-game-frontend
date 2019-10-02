import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/lib/models/Recipe';

@Component({
  selector: 'serious-game-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {

  @Input() recipes: Recipe[];
  chosenRecipe: Recipe;

  constructor() { }

  ngOnInit() {
    this.chosenRecipe = this.chooseRandomRecipe();
  }

  chooseRandomRecipe(){
    return this.recipes[Math.floor(Math.random()*this.recipes.length)];
  }

}
