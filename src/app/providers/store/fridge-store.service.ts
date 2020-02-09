import { Injectable } from "@angular/core";
import { LoggingService } from "ionic-logging-service";
import { Logger } from "log4javascript";
import { Ingredient } from "src/lib/models/Ingredient";
import { AbstractStoreService } from "./abstract-store.service";

@Injectable({
  providedIn: "root"
})
export class FridgeStoreService extends AbstractStoreService {
  private _alreadyRandomized: boolean = false;
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

  public get alreadyRandomized(): boolean {
    this.logging.info(
      "getAlreadyRandomized",
      `getting value of alreadyRandomized: ${this._alreadyRandomized}`
    );
    return this._alreadyRandomized;
  }

  public set alreadyRandomized(value: boolean) {
    this.logging.info(
      "setAlreadyRandomized",
      `setting value of alreadyRandomized: ${value}`
    );
    this._alreadyRandomized = value;
  }
}