import { Component, Input, OnInit } from "@angular/core";
import { FoodCategory } from "src/lib/models/FoodCategory";

@Component({
  selector: "serious-game-shelf",
  templateUrl: "./shelf.component.html",
  styleUrls: ["./shelf.component.scss"]
})
export class ShelfComponent implements OnInit {
  @Input() public shelf: FoodCategory[];

  constructor() {}

  public ngOnInit() {}
}
