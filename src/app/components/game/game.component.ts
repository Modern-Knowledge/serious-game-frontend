import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { AbstractModel } from "src/lib/models/AbstractModel";
import { Errortext } from "src/lib/models/Errortext";
import { Game } from "src/lib/models/Game";
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
