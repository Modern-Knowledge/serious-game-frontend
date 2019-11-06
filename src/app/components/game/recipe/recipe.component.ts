import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { RecipeStoreService } from 'src/app/providers/store/recipe-store.service';
import { Errortext } from 'src/lib/models/Errortext';
import { Game } from 'src/lib/models/Game';
import { Recipe } from 'src/lib/models/Recipe';

import { GameComponent } from '../game.component';

@Component({
  selector: 'serious-game-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, GameComponent {
  @Input() data: Recipe[];
  @Input() game: Game;
  @Input() errorTexts: Errortext[];
  @Input() mainGameSubject: Subject<any>;
  @Output() event: EventEmitter<any> = new EventEmitter();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter();

  private chosenRecipe: Recipe;

  constructor(private recipeStore: RecipeStoreService) {}

  ngOnInit() {
    this.chosenRecipe = this.chooseRandomRecipe();
    this.recipeStore.currentRecipe = this.chosenRecipe;
  }

  /**
   * choose a random recipe from the passed recipes
   * @return Recipe
   */
  chooseRandomRecipe() {
    return this.data[Math.floor(Math.random() * this.data.length)];
  }
}
