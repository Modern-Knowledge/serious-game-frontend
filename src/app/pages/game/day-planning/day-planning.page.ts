import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/providers/auth.service";
import { User } from "src/lib/models/User";
import { Recipe } from "src/lib/models/Recipe";
import { Word } from "src/lib/models/Word";
import { WordService } from "src/app/providers/word.service";
import { RecipeService } from "src/app/providers/recipe.service";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "serious-game-day-planning",
  templateUrl: "./day-planning.page.html",
  styleUrls: ["./day-planning.page.scss"]
})
export class DayPlanningPage {
  user: User;
  words: Word[];
  recipes: Recipe[];
  constructor(
    private authService: AuthService,
    private wordService: WordService,
    private recipeService: RecipeService,
    private dragulaService: DragulaService
  ) {}

  ionViewWillEnter() {
    this.authService.getRelatedUser().subscribe(user => {
      this.user = user;
    });
    this.wordService.getAll().subscribe(words => {
      this.words = words;
    });
    this.recipeService.getAll().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  mixWordsWithRecipes() {
    if (this.words && this.recipes) {
      return [...this.words, ...this.recipes];
    }
  }

  doReorder(event: any) {
    event.detail.complete();
  }

  onSubmit() {
    console.log("valid");
  }
}
