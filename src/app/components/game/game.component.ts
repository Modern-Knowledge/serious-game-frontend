import { Recipe } from "src/lib/models/Recipe";
import { Word } from "src/lib/models/Word";
import { Game } from "src/lib/models/Game";
import { EventEmitter } from "@angular/core";

export interface GameComponent {
  data: (Recipe | Word)[];
  game: Game;
  event: EventEmitter<any>;
}
