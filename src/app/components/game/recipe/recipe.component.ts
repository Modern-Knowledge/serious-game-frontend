import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { RecipeStoreService } from "src/app/providers/store/recipe-store.service";
import { Errortext } from "src/lib/models/Errortext";
import { Game } from "src/lib/models/Game";
import { Recipe } from "src/lib/models/Recipe";

import { IGameComponent } from "../game.component";

@Component({
    selector: "serious-game-recipe",
    styleUrls: ["./recipe.component.scss"],
    templateUrl: "./recipe.component.html"
})
export class RecipeComponent implements OnInit, IGameComponent {
    @Input() public data: Recipe[];
    @Input() public game: Game;
    @Input() public errorTexts: Errortext[];
    @Input() public mainGameSubject: Subject<any>;
    @Output() public event: EventEmitter<any> = new EventEmitter();
    @Output() public errorEvent: EventEmitter<any> = new EventEmitter();

    public chosenRecipe: Recipe;

    constructor(private recipeStore: RecipeStoreService) {}

    public ngOnInit() {
        this.chosenRecipe = this.chooseRandomRecipe();
        this.recipeStore.currentRecipe = this.chosenRecipe;
    }

    /**
     * choose a random recipe from the passed recipes
     * @return Recipe
     */
    public chooseRandomRecipe() {
        return this.data[Math.floor(Math.random() * this.data.length)];
    }

    public cleanupResources() {
        this.recipeStore.currentRecipe = null;
    }
}
