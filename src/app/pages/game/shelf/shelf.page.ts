import { Component, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonContent } from "@ionic/angular";
import { Subscription } from "rxjs";
import { FoodCategoryService } from "src/app/providers/food-category.service";
import { IngredientService } from "src/app/providers/ingredient.service";
import { CartStoreService } from "src/app/providers/store/cart-store.service";
import { FoodCategory } from "src/lib/models/FoodCategory";
import { Ingredient } from "src/lib/models/Ingredient";

@Component({
    selector: "serious-game-shelf",
    styleUrls: ["./shelf.page.scss"],
    templateUrl: "./shelf.page.html"
})
export class ShelfPage implements OnDestroy {
    public foodCategory: FoodCategory;
    public foodItems: Ingredient[];
    @ViewChild("scrollContainer", { static: false })
    public content: IonContent;
    private subscription: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private ingredientService: IngredientService,
        private foodCategoryService: FoodCategoryService,
        private cartStore: CartStoreService
    ) {}

    public ionViewWillEnter() {
        this.subscription.add(
            this.route.paramMap.subscribe((params) => {
                this.foodCategoryService
                    .get(+params.get("id"))
                    .subscribe(
                        (foodCategory) => (this.foodCategory = foodCategory)
                    );
                this.ingredientService
                    .getByFoodCategory(+params.get("id"))
                    .subscribe((ingredients) => {
                        this.foodItems = ingredients;
                    });
            })
        );
    }
    public doReorder(event: any) {
        event.detail.complete();
    }
    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
