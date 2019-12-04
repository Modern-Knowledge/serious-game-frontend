import { Injectable } from "@angular/core";
import { Logger, LoggingService } from "ionic-logging-service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export abstract class AbstractStoreService {

  /**
   * returns last value in emitted items behaviour subject.
   */
  get items(): any[] {
    return this._items.getValue();
  }

  /**
   * pushes a value to the items observable, which will
   * be received by its subscribers.
   */
  set items(value: any[]) {
    this._items.next(value);
  }

  /**
   * provide read-only access to the items as an observable.
   */
  public readonly items$: Observable<any> = this._items.asObservable();
  protected logging: Logger;

  /**
   * items should only be managed by the defined functions.
   */
  private readonly _items = new BehaviorSubject<any[]>([]);
  constructor(loggingService: LoggingService, private loggingName: string) {
    this.logging = loggingService.getLogger(this.loggingName);
  }

  /**
   * removes all items from the state
   */
  public clearItems() {
    this.logging.info("clearItems", `remove all items from store`);
    this.items = [];
  }

  /**
   * adds an item to the state
   */
  protected addItem(value: any) {
    if (value) {
      if (this.items.findIndex((item) => item.id === value.id) === -1) {
        this.logging.info("addItem", `store item with id ${value.id}`);
        this.items = [...this.items, value];
      } else {
        this.logging.warn("addItem", `item with id ${value.id} is already in the store`);
      }
      this.logging.info("addItem", `current state:${JSON.stringify(this.items)}`);
    }
  }

  /**
   * adds items to the state
   */
  protected addItems(values: any[]) {
    values.forEach((value) => {
      this.addItem(value);
    });
  }

  /**
   * removes an item from the state
   */
  protected removeItem(value: any) {
    this.logging.info("removeItem", `remove item with id ${value.id}`);
    this.items = this.items.filter((item) => item.id !== value.id);
    this.logging.info("removeItem", `current state:${JSON.stringify(this.items)}`);
  }
}
