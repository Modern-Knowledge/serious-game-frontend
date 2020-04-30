import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IonContent } from "@ionic/angular";
import { Observable, Subject, Subscription } from "rxjs";
import { FoodCategoryService } from "src/app/providers/food-category.service";
import { CartStoreService } from "src/app/providers/store/cart-store.service";
import { ShoppingListStoreService } from "src/app/providers/store/shopping-list-store.service";
import { Errortexts } from "serious-game-library/dist/enums/Errortexts";
import { Errortext } from "serious-game-library/dist/models/Errortext";
import { FoodCategory } from "serious-game-library/dist/models/FoodCategory";
import { Game } from "serious-game-library/dist/models/Game";
import { Ingredient } from "serious-game-library/dist/models/Ingredient";
import { Word } from "serious-game-library/dist/models/Word";
import { getErrorText } from "serious-game-library/dist/utils/errorTextHelper";

import { IGameComponent } from "../game.component";

@Component({
    selector: "serious-game-shopping-center",
    styleUrls: ["./shopping-center.component.scss"],
    templateUrl: "./shopping-center.component.html"
})
export class ShoppingCenterComponent implements OnInit, IGameComponent {
    @Input() public data: Ingredient[];
    @Input() public game: Game;
    @Input() public errorTexts: Errortext[];
    @Input() public mainGameSubject: Subject<any>;
    @Input() public scrollContainer: IonContent;
    @Output() public event: EventEmitter<any> = new EventEmitter();
    @Output() public errorEvent: EventEmitter<any> = new EventEmitter();
    public shelves: Observable<FoodCategory[]>;

    private shoppingCart: Ingredient[] = [];
    private availableItems: Array<Ingredient | Word>;
    private subscription: Subscription = new Subscription();

    constructor(
        private foodCategoryService: FoodCategoryService,
        private shoppingListStore: ShoppingListStoreService,
        private shoppingCartStore: CartStoreService
    ) {
        this.shelves = this.foodCategoryService.getAll();
    }

    public ngOnInit() {
        this.subscription.add(
            this.mainGameSubject.subscribe(() => {
                if (this.shoppingCart) {
                    if (this.shoppingCartIsValid() === true) {
                        this.event.emit();
                    } else {
                        const errorText = getErrorText(
                            this.errorTexts,
                            Errortexts.SHOPPING_CART
                        );
                        this.errorEvent.emit(errorText);
                    }
                }
            })
        );
    }

    /**
     * check if the shopping cart is valid
     */
    public shoppingCartIsValid(): boolean {
        let allItemsFound = true;
        if (this.shoppingListStore.items.length === 0) {
            return true;
        }
        if (
            this.shoppingListStore.items.length !==
            this.shoppingCartStore.items.length
        ) {
            return false;
        }
        this.shoppingListStore.items.forEach((item) => {
            const valid =
                this.shoppingCartStore.items.findIndex((shoppingCartItem) => {
                    return shoppingCartItem.id === item.id;
                }) > -1;
            if (valid === false) {
                allItemsFound = false;
            }
        });
        return allItemsFound;
    }

    public cleanupResources() {
        this.subscription.unsubscribe();
        this.shoppingCartStore.clearItems();
        this.shoppingListStore.clearItems();
    }
}
