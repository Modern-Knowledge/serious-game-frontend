import { Injectable } from "@angular/core";
import { LoggingService } from "ionic-logging-service";
import { AbstractStoreService } from "./abstract-store.service";
import { Ingredient } from "src/lib/models/Ingredient";

@Injectable({
  providedIn: "root"
})
export class FridgeStoreService extends AbstractStoreService {
  constructor(loggingService: LoggingService) {
    super(loggingService, "fridge-store");
  }

  public addItem(value: Ingredient) {
    super.addItem(value);
  }

  public addItems(values: Ingredient[]) {
    super.addItems(values);
  }

  public removeItem(value: Ingredient) {
    super.removeItem(value);
  }
}
