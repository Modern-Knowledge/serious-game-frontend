import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { FoodCategoryService } from "src/app/providers/food-category.service";
import { CartStoreService } from "src/app/providers/store/cart-store.service";
import { ShoppingListStoreService } from "src/app/providers/store/shopping-list-store.service";
import { Errortext } from "src/lib/models/Errortext";
import { FoodCategory } from "src/lib/models/FoodCategory";
import { Game } from "src/lib/models/Game";
import { Ingredient } from "src/lib/models/Ingredient";
import { Word } from "src/lib/models/Word";

import { GameComponent } from "../game.component";

@Component({
    selector: "serious-game-shopping-center",
    styleUrls: ["./shopping-center.component.scss"],
    templateUrl: "./shopping-center.component.html"
})
export class ShoppingCenterComponent
    implements OnInit, GameComponent, OnDestroy {
    @Input() public data: Ingredient[];
    @Input() public game: Game;
    @Input() public errorTexts: Errortext[];
    @Input() public mainGameSubject: Subject<any>;
    @Output() public event: EventEmitter<any> = new EventEmitter();
    @Output() public errorEvent: EventEmitter<any> = new EventEmitter();
    public shelves: Observable<FoodCategory[]>;

    private shoppingCart: Ingredient[] = [];
    private availableItems: Array<Ingredient | Word>;
    private validShoppingCart = false;
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
                    if (this.shoppingCartIsValid()) {
                        this.event.emit();
                    } else {
                        this.errorEvent.emit(
                            this.errorTexts.find(
                                (errorText) =>
                                    errorText.name === "shopping-cart"
                            )
                        );
                    }
                }
            })
        );
    }

    /**
     * check if the shopping cart is valid
     */
    public shoppingCartIsValid(): boolean {
        this.shoppingListStore.items.forEach((item) => {
            this.validShoppingCart =
                this.shoppingCartStore.items.findIndex((shoppingCartItem) => {
                    return shoppingCartItem.id === item.id;
                }) > -1;
        });
        return this.validShoppingCart;
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
