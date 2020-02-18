import {Component, Inject} from "@angular/core";
import {Subscription} from "rxjs";
import {Ingredient} from "../../../lib/models/Ingredient";
import {IngredientService} from "../../providers/ingredient.service";

@Component({
    selector: "serious-game-ingredients",
    styleUrls: ["./ingredients.page.scss"],
    templateUrl: "./ingredients.page.html",
})
export class IngredientsPage {
    public ingredients: Ingredient[];
    private subscription: Subscription;

    constructor(
        private ingredientService: IngredientService,
        @Inject("BACKEND_URL") public baseUrl: string
    ) {
        this.subscription = new Subscription();
    }

    public ionViewWillEnter() {
        this.subscription.add(
            this.ingredientService.getAll().subscribe((ingredients: Ingredient[]) => {
                this.ingredients = ingredients.sort(
                    (a: Ingredient, b: Ingredient) => a.foodCategory.name.localeCompare(b.foodCategory.name));
            })
        );
    }
}
