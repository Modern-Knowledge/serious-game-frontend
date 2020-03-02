import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IonContent, ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { ShelfPage } from "src/app/pages/game/shelf/shelf.page";
import { IngredientService } from "src/app/providers/ingredient.service";
import { FoodCategory } from "src/lib/models/FoodCategory";
import { Ingredient } from "src/lib/models/Ingredient";

@Component({
    selector: "serious-game-shelf-component",
    styleUrls: ["./shelf.component.scss"],
    templateUrl: "./shelf.component.html"
})
export class ShelfComponent implements OnInit, OnDestroy {
    @Input() public shelf: FoodCategory;
    @Input() public scrollContainer: IonContent;
    public foodItems: Ingredient[] = [];
    private subscription: Subscription = new Subscription();

    constructor(
        private ingredientService: IngredientService,
        private modalController: ModalController
    ) {}

    public ngOnInit() {
        this.subscription.add(
            this.ingredientService
                .getByFoodCategory(+this.shelf.id)
                .subscribe((ingredients) => {
                    this.foodItems = ingredients;
                })
        );
    }

    public async showShelf() {
        const modal = await this.modalController.create({
            component: ShelfPage,
            componentProps: {
                id: this.shelf.id
            }
        });
        return await modal.present();
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
