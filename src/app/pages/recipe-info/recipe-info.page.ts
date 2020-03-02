import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Mealtimes} from "../../../lib/enums/Mealtimes";
import {Difficulty} from "../../../lib/models/Difficulty";
import {Recipe} from "../../../lib/models/Recipe";
import {AuthService} from "../../providers/auth.service";
import {RecipeService} from "../../providers/recipe.service";
import {UtilService} from "../../providers/util/util.service";

@Component({
    selector: "serious-game-recipe-info",
    styleUrls: ["./recipe-info.page.scss"],
    templateUrl: "./recipe-info.page.html"
})
export class RecipeInfoPage {
    public recipes: Recipe[];
    public difficulties: Difficulty[];
    public mealtimes: Mealtimes[];
    public selectedDifficulty = 0;
    public selectedMealtime = "all";
    public isTherapist: boolean;

    private subscription: Subscription;

    /**
     * @param recipeService recipe service
     * @param utilService util service
     * @param authService authentication service
     */
    constructor(
        private recipeService: RecipeService,
        private utilService: UtilService,
        private authService: AuthService,
    ) {
        this.subscription = new Subscription();
    }

    /**
     * Executes when the ionic enters the page.
     */
    public ionViewWillEnter() {
        this.isTherapist = this.authService.isTherapist();
        this.fetchRecipes();

        this.subscription.add(
            this.utilService.getMealtimes().subscribe((mealtimes: Mealtimes[]) => {
                this.mealtimes = mealtimes;
            })
        );

        this.subscription.add(
            this.utilService.getDifficulties().subscribe((difficulties: Difficulty[]) => {
                this.difficulties = difficulties;
            })
        );
    }

    /**
     * Executed, when the view is left.
     */
    public ionViewDidLeave(): void {
        this.subscription.unsubscribe();
    }

    /**
     * Fetch recipes with the changed mealtime.
     *
     * @param event html event
     */
    public changeMealtime(event): void {
        this.selectedMealtime = event.target.value;
        this.fetchRecipes();
    }

    /**
     * Update the mealtime for the given recipe.
     *
     * @param event javascript event
     * @param recipe recipe to update
     */
    public updateMealtime(event, recipe: Recipe): void {
        const target = event.target;
        recipe.mealtime = target.value;

        this.updateRecipe(recipe);
    }

    /**
     * Update the difficulty for the given recipe
     *
     * @param event javascript event
     * @param recipe recipe to update
     */
    public updateDifficulty(event, recipe: Recipe): void {
        const target = event.target;
        recipe.difficultyId = target.value;

        this.updateRecipe(recipe);
    }

    /**
     * Fetch recipes with the changed difficulty.
     *
     * @param event html event
     */
    public changeDifficulty(event): void {
        this.selectedDifficulty = event.target.value;
        this.fetchRecipes();
    }

    /**
     * Fetch recipes with the given filters.
     */
    private fetchRecipes() {
        this.subscription.add(
            this.recipeService.getFiltered(this.selectedMealtime, this.selectedDifficulty)
                .subscribe((recipes: Recipe[]) => {
                    this.recipes = recipes;
                })
        );
    }

    /**
     * Updates the recipes and fetches the updated recipes.
     *
     * @param recipe recipe to update
     */
    private updateRecipe(recipe: Recipe) {
        this.subscription.add(
            this.recipeService.updateRecipe(recipe)
                .subscribe((updatedRecipe: Recipe) => {
                    this.fetchRecipes();
                })
        );
    }
}
