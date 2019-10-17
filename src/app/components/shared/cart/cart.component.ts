import { Component, OnInit, Input } from "@angular/core";
import { Ingredient } from "src/lib/models/Ingredient";
import { Word } from "src/lib/models/Word";
import { CartStoreService } from "src/app/providers/store/cart-store.service";
import { DropZoneComponent } from "../drop-zone/drop-zone.component";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "serious-game-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  @Input() data: (Ingredient | Word)[];
  @Input() name: string;

  constructor(private cartStore: CartStoreService) {}

  ngOnInit() {}

  addFoodItem(item) {
    console.log(item);
    this.cartStore.addItem(item);
  }

  removeFoodItem(item) {
    this.cartStore.removeItem(item);
  }
}
