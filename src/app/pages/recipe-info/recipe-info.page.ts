import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Mealtimes} from "../../../lib/enums/Mealtimes";
import {Difficulty} from "../../../lib/models/Difficulty";
import {Recipe} from "../../../lib/models/Recipe";
import {RecipeService} from "../../providers/recipe.service";
import {UtilService} from "../../providers/util/util.service";

@Component({
    selector: "serious-game-recipe-info",
    styleUrls: ["./recipe-info.page.scss"],
    templateUrl: "./recipe-info.page.html"
})
export class RecipeInfoPage {
    private recipes: Recipe[];
    private difficulties: Difficulty[];
    private mealtimes: Mealtimes[];
    private subscription: Subscription;

    private selectedDifficulty = 0;
    private selectedMealtime = "all";

    /**
     * @param recipeService recipe service
     * @param utilService util service<
     */
    constructor(
        private recipeService: RecipeService,
        private utilService: UtilService
    ) {
        this.subscription = new Subscription();
    }

    public ionViewWillEnter() {
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
    private changeMealtime(event): void {
        this.selectedMealtime = event.target.value;
        this.fetchRecipes();
    }

    /**
     * Fetch recipes with the changed difficulty.
     *
     * @param event html event
     */
    private changeDifficulty(event): void {
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
}
