import { Recipe } from "src/lib/models/Recipe";
import { Word } from "src/lib/models/Word";
import { Game } from "src/lib/models/Game";
import { EventEmitter } from "@angular/core";
import { AbstractModel } from "src/lib/models/AbstractModel";
import { Errortext } from "src/lib/models/Errortext";
import { Subject } from "rxjs";

export interface GameComponent {
  data: AbstractModel<any>[];
  game: Game;
  errorTexts: Errortext[];
  mainGameSubject: Subject<any>;
  event: EventEmitter<any>;
  errorEvent: EventEmitter<any>;
}
