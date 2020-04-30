import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { AbstractModel } from "serious-game-library/dist/models/AbstractModel";
import { Errortext } from "serious-game-library/dist/models/Errortext";
import { Game } from "serious-game-library/dist/models/Game";
import { IonContent } from '@ionic/angular';

export interface IGameComponent {
    data: Array<AbstractModel<any>>;
    game: Game;
    errorTexts: Errortext[];
    mainGameSubject: Subject<any>;
    scrollContainer: IonContent
    event: EventEmitter<any>;
    errorEvent: EventEmitter<any>;
    cleanupResources(): void;
}
