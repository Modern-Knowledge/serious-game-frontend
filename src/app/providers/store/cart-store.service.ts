import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LoggingService, Logger } from "ionic-logging-service";

@Injectable({
  providedIn: "root"
})
export class CartStoreService {
  private logging: Logger;
  constructor(private loggingService: LoggingService) {
    this.logging = this.loggingService.getLogger("cart-store");
  }

  /**
   * items should only be managed by the defined functions.
   */
  private readonly _items = new BehaviorSubject<any[]>([]);

  /**
   * provide read-only access to the items as an observable.
   */
  readonly items$: Observable<any> = this._items.asObservable();

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
   * adds an item to the state
   */
  addItem(value: any) {
    if (value) {
      if (this.items.findIndex(item => item.id === value.id) === -1) {
        this.logging.info("addItem", `store item with id ${value.id}`);
        this.items = [...this.items, value];
      } else {
        this.logging.warn(
          "addItem",
          `item with id ${value.id} is already in the store`
        );
      }
      this.logging.info(
        "addItem",
        `current state:${JSON.stringify(this.items)}`
      );
    }
  }

  /**
   * removes an item from the state
   */
  removeItem(value: any) {
    this.logging.info("removeItem", `remove item with id ${value.id}`);
    this.items = this.items.filter(item => item.id !== value.id);
    this.logging.info(
      "removeItem",
      `current state:${JSON.stringify(this.items)}`
    );
  }
}
