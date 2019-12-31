import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { IngredientService } from "src/app/providers/ingredient.service";
import { FridgeStoreService } from "src/app/providers/store/fridge-store.service";
import { Ingredient } from "src/lib/models/Ingredient";

@Component({
    selector: "serious-game-fridge",
    styleUrls: ["./fridge.page.scss"],
    templateUrl: "./fridge.page.html"
})
export class FridgePage {
    private ingredients: Ingredient[];
    private subscription: Subscription = new Subscription();

    constructor(
        private ingredientService: IngredientService,
        private fridgeStore: FridgeStoreService
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
     * drops random items from an array
     * @param items
     */
    public dropRandomItems(items: any[]) {
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
