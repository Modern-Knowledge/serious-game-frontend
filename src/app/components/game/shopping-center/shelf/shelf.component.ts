import { Component, OnInit, Input } from "@angular/core";
import { FoodCategory } from "src/lib/models/FoodCategory";

@Component({
  selector: "serious-game-shelf",
  templateUrl: "./shelf.component.html",
  styleUrls: ["./shelf.component.scss"]
})
export class ShelfComponent implements OnInit {
  @Input() shelf: FoodCategory[];

  constructor() {}

  ngOnInit() {}
}
