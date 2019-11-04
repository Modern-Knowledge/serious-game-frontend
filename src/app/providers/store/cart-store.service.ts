import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LoggingService, Logger } from "ionic-logging-service";
import { AbstractStoreService } from "./abstract-store.service";
import { Recipe } from "src/lib/models/Recipe";

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
