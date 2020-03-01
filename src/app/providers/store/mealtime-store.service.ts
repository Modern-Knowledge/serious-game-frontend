import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Mealtimes } from "src/lib/enums/Mealtimes";
import { Recipe } from "src/lib/models/Recipe";

@Injectable({
    providedIn: "root"
})
export class MealtimeStoreService {
    private readonly _items = new BehaviorSubject<Map<Mealtimes, Recipe>>(
        new Map(null)
    );
    get items(): Map<Mealtimes, Recipe> {
        return this._items.value;
    }
    set items(value) {
        this._items.next(value);
    }
    public addItem(value: Recipe, mealtime: Mealtimes) {
        this.items.set(mealtime, value);
    }
    public emptyMealtime(mealtime: Mealtimes) {
        this.items.set(mealtime, undefined);
    }
    public clearItems() {
        this.items = new Map(null);
    }
}
