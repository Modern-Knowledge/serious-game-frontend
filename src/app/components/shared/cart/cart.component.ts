import { Component, OnInit, Input } from "@angular/core";
import { Ingredient } from "src/lib/models/Ingredient";
import { Word } from "src/lib/models/Word";
import { CartStoreService } from "src/app/providers/store/cart-store.service";

@Component({
  selector: "serious-game-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  @Input() data: (Ingredient | Word)[];
  @Input() name: string;
  @Input() viewing: boolean;
  private items: (Ingredient | Word)[];

  constructor(private cartStore: CartStoreService) {}

  ngOnInit() {
    this.cartStore.items$.subscribe(items => {
      this.items = items;
    });
  }

  addFoodItem(item) {
    this.cartStore.addItem(item);
  }

  removeFoodItem(item) {
    this.cartStore.removeItem(item);
  }
}
