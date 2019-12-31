import { Component, Input } from "@angular/core";
import { FoodCategory } from "src/lib/models/FoodCategory";

@Component({
    selector: "serious-game-shelf",
    styleUrls: ["./shelf.component.scss"],
    templateUrl: "./shelf.component.html"
})
export class ShelfComponent {
    @Input() public shelf: FoodCategory;
}
