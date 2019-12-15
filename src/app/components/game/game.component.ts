import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { AbstractModel } from "src/lib/models/AbstractModel";
import { Errortext } from "src/lib/models/Errortext";
import { Game } from "src/lib/models/Game";

export interface IGameComponent {
    data: Array<AbstractModel<any>>;
    game: Game;
    errorTexts: Errortext[];
    mainGameSubject: Subject<any>;
    event: EventEmitter<any>;
    errorEvent: EventEmitter<any>;
    cleanupResources(): void;
}
