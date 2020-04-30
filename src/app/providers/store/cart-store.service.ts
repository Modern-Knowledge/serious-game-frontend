import { Injectable } from "@angular/core";
import { Logger, LoggingService } from "ionic-logging-service";
import { BehaviorSubject, Observable } from "rxjs";
import { Recipe } from "serious-game-library/dist/models/Recipe";
import { AbstractStoreService } from "./abstract-store.service";

@Injectable({
  providedIn: "root"
})
export class CartStoreService extends AbstractStoreService {
  constructor(loggingService: LoggingService) {
    super(loggingService, "cart-store");
  }

  public addItem(value: Recipe) {
    super.addItem(value);
  }

  public addItems(values: Recipe[]) {
    super.addItems(values);
  }

  public removeItem(value: Recipe) {
    super.removeItem(value);
  }
}
