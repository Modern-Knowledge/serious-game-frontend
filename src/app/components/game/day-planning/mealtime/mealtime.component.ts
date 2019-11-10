import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Mealtimes } from 'src/lib/enums/Mealtimes';
import { Errortext } from 'src/lib/models/Errortext';
import { Recipe } from 'src/lib/models/Recipe';

@Component({
  selector: 'serious-game-mealtime',
  templateUrl: './mealtime.component.html',
  styleUrls: ['./mealtime.component.scss']
})
export class MealtimeComponent implements OnInit {
  @Input() title: string;
  @Input() model: string;
  @Input() mealtime: Mealtimes;
  @Input() errorTexts: Errortext[];
  @Output() event: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dragulaService: DragulaService) {}

  ngOnInit() {}

  addRecipe(value: Recipe) {
    if (this.matchMealtimes(value.mealtime)) {
      this.event.emit(value);
    } else {
      this.dragulaService.find('recipes').drake.cancel(true);
      // TODO: get correct error text.
      this.errorEvent.emit(this.errorTexts[0]);
    }
  }

  matchMealtimes(mealtime: Mealtimes): boolean {
    return this.mealtime === mealtime;
  }
}
