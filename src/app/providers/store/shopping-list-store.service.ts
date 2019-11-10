import { Injectable } from '@angular/core';
import { LoggingService } from 'ionic-logging-service';
import { Recipe } from 'src/lib/models/Recipe';

import { AbstractStoreService } from './abstract-store.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListStoreService extends AbstractStoreService {
  constructor(loggingService: LoggingService) {
    super(loggingService, 'shopping-list-store');
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
