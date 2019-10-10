import { Recipe } from "src/lib/models/Recipe";
import { Word } from "src/lib/models/Word";
import { Game } from "src/lib/models/Game";
import { EventEmitter } from "@angular/core";
import { AbstractModel } from "src/lib/models/AbstractModel";

export interface GameComponent {
  data: AbstractModel<any>[];
  game: Game;
  event: EventEmitter<any>;
}
