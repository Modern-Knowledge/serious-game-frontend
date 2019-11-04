import { Injectable } from "@angular/core";
import { LoggingService } from "ionic-logging-service";
import { AbstractStoreService } from "./abstract-store.service";
import { Ingredient } from "src/lib/models/Ingredient";
import { Logger } from "log4javascript";

@Injectable({
  providedIn: "root"
})
export class FridgeStoreService extends AbstractStoreService {
  private alreadyRandomized: boolean = false;
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

  public getAlreadyRandomized(): boolean {
    this.logging.info(
      "getAlreadyRandomized",
      `getting value of alreadyRandomized: ${this.alreadyRandomized}`
    );
    return this.alreadyRandomized;
  }

  public setAlreadyRandomized(value: boolean) {
    this.logging.info(
      "setAlreadyRandomized",
      `setting value of alreadyRandomized: ${value}`
    );
    this.alreadyRandomized = value;
  }
}
