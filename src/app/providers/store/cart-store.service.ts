import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { v4 as uuid } from "uuid";

@Injectable({
  providedIn: "root"
})
export class CartStoreService {
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

  addItem(value: any) {
    if (this.items.findIndex(item => item.id === value.id) === -1) {
      console.log("store item " + value.id);
      this.items = [...this.items, value];
    }
  }

  removeItem(id: string) {
    console.log("remove item " + id);
    this.items = this.items.filter(item => item.id !== id);
  }
}
