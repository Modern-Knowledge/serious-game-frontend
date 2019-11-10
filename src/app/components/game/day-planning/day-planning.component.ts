import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Mealtimes } from 'src/lib/enums/Mealtimes';
import { Errortext } from 'src/lib/models/Errortext';
import { Game } from 'src/lib/models/Game';
import { Recipe } from 'src/lib/models/Recipe';
import { Word } from 'src/lib/models/Word';

import { GameComponent } from '../game.component';

@Component({
  selector: 'serious-game-day-planning',
  templateUrl: './day-planning.component.html',
  styleUrls: ['./day-planning.component.scss']
})
export class DayPlanningComponent implements OnInit, GameComponent {
  @Input() data: (Recipe | Word)[];
  @Input() game: Game;
  @Input() errorTexts: Errortext[];
  @Input() mainGameSubject: Subject<any>;
  @Output() event: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter<any>();

  Mealtimes: Mealtimes;
  breakfast: Mealtimes = Mealtimes.BREAKFAST;
  lunch: Mealtimes = Mealtimes.LUNCH;
  dinner: Mealtimes = Mealtimes.DINNER;

  constructor() {}

  ngOnInit() {}

  addRecipe(value: Recipe) {
    this.event.emit(value);
  }

  showError(errortext: Errortext) {
    this.errorEvent.emit(errortext);
  }

  doReorder(event: any) {
    event.detail.complete();
  }
}
