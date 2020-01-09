import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IngredientService } from "src/app/providers/ingredient.service";
import { FridgeStoreService } from "src/app/providers/store/fridge-store.service";
import { RecipeStoreService } from "src/app/providers/store/recipe-store.service";
import { Ingredient } from "src/lib/models/Ingredient";

@Component({
    selector: "serious-game-fridge",
    styleUrls: ["./fridge.page.scss"],
    templateUrl: "./fridge.page.html"
})
export class FridgePage implements OnDestroy {
    public ingredients: Ingredient[];
    private subscription: Subscription = new Subscription();

    constructor(
        private ingredientService: IngredientService,
        private fridgeStore: FridgeStoreService,
        private recipeStore: RecipeStoreService
    ) {}

    public ionViewWillEnter() {
        this.subscription.add(
            this.fridgeStore.items$.subscribe((items) => {
                if (this.fridgeStore.alreadyRandomized) {
                    this.ingredients = items;
                } else {
                    this.getRandomIngredients();
                }
            })
        );
    }

    /**
     * gets random ingredients from the backend and stores them in the fridge
     */
    public getRandomIngredients() {
        this.subscription.add(
            this.ingredientService.getAll().subscribe((ingredients) => {
                if (!this.fridgeStore.alreadyRandomized) {
                    const randomizedIngredients = this.dropRandomItems(
                        ingredients
                    );
                    this.ingredients = randomizedIngredients;
                    this.fridgeStore.addItems(randomizedIngredients);
                    this.fridgeStore.alreadyRandomized = true;
                }
            })
        );
    }

    /**
     * Drops random items from an array.
     * @param items - The items to drop random items from.
     */
    public dropRandomItems(items: any[]) {
        // always drop one needed ingredient beforehand
        const droppedItem = this.recipeStore.currentRecipe.ingredients[
            Math.floor(
                Math.random() *
                    this.recipeStore.currentRecipe.ingredients.length
            )
        ];
        items.splice(
            items.findIndex((item) => item.id === droppedItem.id),
            1
        );
        let dropAmount = Math.floor(Math.random() * items.length);
        for (dropAmount; dropAmount <= items.length; dropAmount++) {
            const randomIndex = Math.floor(Math.random() * items.length);
            items.splice(randomIndex, 1);
        }
        return items;
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
