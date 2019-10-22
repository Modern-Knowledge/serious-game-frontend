import { Component, OnInit, Input } from "@angular/core";
import { Ingredient } from "src/lib/models/Ingredient";
import { Word } from "src/lib/models/Word";
import { CartStoreService } from "src/app/providers/store/cart-store.service";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "serious-game-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  @Input() id: string;
  @Input() data: (Ingredient | Word)[];
  @Input() name: string;
  @Input() viewing: boolean;
  private items: (Ingredient | Word)[];

  constructor(
    private cartStore: CartStoreService,
    private dragulaService: DragulaService
  ) {}

  ngOnInit() {
    this.cartStore.items$.subscribe(items => {
      this.items = items;
    });
    this.dragulaService.dropModel(this.name).subscribe(value => {
      const item = this.data.find(element => element.id === +value.el.id);
      if (value.target.id === "shelf") {
        this.removeFoodItem(item);
      } else {
        this.addFoodItem(item);
        this.dragulaService.find(this.name).drake.cancel(true);
      }
    });
  }

  addFoodItem(item) {
    this.cartStore.addItem(item);
  }

  removeFoodItem(item) {
    this.cartStore.removeItem(item);
  }
}
