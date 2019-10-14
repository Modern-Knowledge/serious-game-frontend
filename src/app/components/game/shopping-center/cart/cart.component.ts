import { Component, OnInit, Input } from "@angular/core";
import { Ingredient } from "src/lib/models/Ingredient";
import { Word } from "src/lib/models/Word";

@Component({
  selector: "serious-game-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  @Input() data: (Ingredient | Word)[];

  constructor() {}

  ngOnInit() {}
}
