import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IonContent } from "@ionic/angular";
import { Subscription } from "rxjs";
import { IngredientService } from "src/app/providers/ingredient.service";
import { FoodCategory } from "src/lib/models/FoodCategory";
import { Ingredient } from "src/lib/models/Ingredient";

@Component({
    selector: "serious-game-shelf",
    styleUrls: ["./shelf.component.scss"],
    templateUrl: "./shelf.component.html"
})
export class ShelfComponent implements OnInit, OnDestroy {
    @Input() public shelf: FoodCategory;
    @Input() public scrollContainer: IonContent;
    public foodItems: Ingredient[] = [];
    private subscription: Subscription = new Subscription();

    constructor(private ingredientService: IngredientService) {}

    public ngOnInit() {
        this.subscription.add(
            this.ingredientService
                .getByFoodCategory(+this.shelf.id)
                .subscribe((ingredients) => {
                    this.foodItems = ingredients;
                })
        );
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
