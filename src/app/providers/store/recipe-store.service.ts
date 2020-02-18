import { Injectable } from "@angular/core";
import { Logger, LoggingService } from "ionic-logging-service";
import { Recipe } from "src/lib/models/Recipe";

@Injectable({
  providedIn: "root"
})
export class RecipeStoreService {
  private _logging: Logger;
  private _currentRecipe: Recipe;
  constructor(private loggingService: LoggingService) {
    this._logging = this.loggingService.getLogger("recipe-store");
  }

  /**
   * get the currently selected recipe
   */
  get currentRecipe() {
    this._logging.debug(
      "getCurrentRecipe",
      `getting value of currentRecipe: ${JSON.stringify(this._currentRecipe)}`
    );
    return this._currentRecipe;
  }

  /**
   * set the currently selected recipe
   */
  set currentRecipe(value: Recipe) {
    this._logging.debug(
      "setCurrentRecipe",
      `setting value of currentRecipe: ${JSON.stringify(value)}`
    );
    this._currentRecipe = value;
  }
}
