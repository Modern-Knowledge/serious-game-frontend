import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Recipe} from "../../../lib/models/Recipe";
import {RecipeService} from "../../providers/recipe.service";
import {Difficulties} from "../../../lib/enums/Difficulties";

@Component({
    selector: "serious-game-recipe-info",
    styleUrls: ["./recipe-info.page.scss"],
    templateUrl: "./recipe-info.page.html"
})
export class RecipeInfoPage {
    private recipes: Recipe[];
    private subscription: Subscription;

    /**
     * @param recipeService recipe service
     */
    constructor(
        private recipeService: RecipeService
    ) {
        this.subscription = new Subscription();
    }

    public ionViewWillEnter() {
        this.subscription.add(
            this.recipeService.getAll().subscribe((recipes: Recipe[]) => {
                this.recipes = recipes;
                console.log(recipes[0]);
            })
        );
    }

    /**
     * Executed, when the view is left.
     */
    public ionViewDidLeave(): void {
        this.subscription.unsubscribe();
    }
}
