import { Component, OnInit } from "@angular/core";
import { User } from "src/lib/models/User";
import { Word } from "src/lib/models/Word";
import { Recipe } from "src/lib/models/Recipe";
import { AuthService } from "src/app/providers/auth.service";
import { WordService } from "src/app/providers/word.service";
import { RecipeService } from "src/app/providers/recipe.service";
import { GameService } from "src/app/providers/game.service";
import { Game } from "src/lib/models/Game";

@Component({
  selector: "serious-game-game",
  templateUrl: "./game.page.html",
  styleUrls: ["./game.page.scss"]
})
export class GamePage {
  user: User;
  words: Word[];
  recipes: Recipe[];
  games: Game[];
  chosenRecipes: (Recipe | Word)[] = [];
  step: number;
  constructor(
    private authService: AuthService,
    private wordService: WordService,
    private recipeService: RecipeService,
    private gameService: GameService
  ) {}

  ionViewWillEnter() {
    this.step = 0;
    this.authService.getRelatedUser().subscribe(user => {
      this.user = user;
    });
    this.wordService.getAll().subscribe(words => {
      this.words = words;
    });
    this.recipeService.getAll().subscribe(recipes => {
      this.recipes = recipes;
    });
    this.gameService.getAll().subscribe(games => {
      this.games = games;
    });
  }

  mixWordsWithRecipes() {
    if (this.words && this.recipes) {
      return [...this.words, ...this.recipes];
    }
  }

  onSubmit() {
    this.step++;
  }

  addRecipe(recipe: Recipe | Word) {
    this.chosenRecipes.push(recipe);
  }
}
