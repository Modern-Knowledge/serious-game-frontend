import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/lib/models/Recipe";
import { Mealtimes } from "src/lib/enums/Mealtimes";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "serious-game-mealtime",
  templateUrl: "./mealtime.component.html",
  styleUrls: ["./mealtime.component.scss"]
})
export class MealtimeComponent implements OnInit {
  @Input() title: string;
  @Input() model: string;
  @Input() mealtime: Mealtimes;
  @Output() event: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dragulaService: DragulaService) {}

  ngOnInit() {}

  addRecipe(value: Recipe) {
    if (this.matchMealtimes(value.mealtime)) {
      this.event.emit(value);
    } else {
      this.dragulaService.find("recipes").drake.cancel(true);
      this.errorEvent.emit(
        `${value.name} ist kein gültiges Rezept für das ${this.mealtime}!`
      );
    }
  }

  matchMealtimes(mealtime: Mealtimes): boolean {
    return this.mealtime === mealtime;
  }
}
