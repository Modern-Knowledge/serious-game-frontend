import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Subscription } from "rxjs";
import { CartStoreService } from "src/app/providers/store/cart-store.service";
import { Ingredient } from "serious-game-library/dist/models/Ingredient";
import { Word } from "serious-game-library/dist/models/Word";

@Component({
    selector: "serious-game-cart",
    styleUrls: ["./cart.component.scss"],
    templateUrl: "./cart.component.html"
})
export class CartComponent implements OnInit, OnDestroy {
    @Input() public id: string;
    @Input() public data: Array<Ingredient | Word>;
    @Input() public name: string;
    @Input() public viewing: boolean;
    public items: Array<Ingredient | Word>;
    private subscriptions: Subscription = new Subscription();

    constructor(
        private cartStore: CartStoreService,
        private dragulaService: DragulaService
    ) {}

    public ngOnInit() {
        this.subscriptions.add(
            this.cartStore.items$.subscribe((items) => {
                this.items = items;
            })
        );
        this.subscriptions.add(
            this.dragulaService.dropModel(this.name).subscribe((value) => {
                const item = this.data.find(
                    (element) => element.id === +value.el.id
                );
                if (value.target.id === "shelf") {
                    this.removeFoodItem(item);
                } else {
                    this.addFoodItem(item);
                    this.dragulaService.find(this.name).drake.cancel(true);
                }
            })
        );
    }

    public addFoodItem(item) {
        this.cartStore.addItem(item);
    }

    public removeFoodItem(item) {
        this.cartStore.removeItem(item);
    }

    public ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
