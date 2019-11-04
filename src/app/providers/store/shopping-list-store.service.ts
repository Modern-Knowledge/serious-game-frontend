import { Injectable } from "@angular/core";
import { AbstractStoreService } from "./abstract-store.service";
import { LoggingService } from "ionic-logging-service";
import { Recipe } from "src/lib/models/Recipe";

@Injectable({
  providedIn: "root"
})
export class ShoppingListStoreService extends AbstractStoreService {
  constructor(loggingService: LoggingService) {
    super(loggingService, "shopping-list-store");
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
