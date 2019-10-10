import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FoodCategory } from "src/lib/models/FoodCategory";
import {
  HttpResponse,
  HttpResponseStatus
} from "src/lib/utils/http/HttpResponse";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FoodCategoryService {
  constructor(private http: HttpClient) {}

  get(id): Observable<FoodCategory> {
    return this.http
      .get<HttpResponse>(`food-categories/${id}`)
      .pipe(
        map(foodCategory =>
          new FoodCategory().deserialize(
            new HttpResponse().deserialize(foodCategory).data.foodCategories
          )
        )
      );
  }

  getAll(): Observable<FoodCategory[]> {
    return this.http.get<HttpResponse>(`food-categories`).pipe(
      map(foodCategories => {
        const foodCategorysModel = new HttpResponse().deserialize(
          foodCategories
        );
        return foodCategorysModel.status === HttpResponseStatus.SUCCESS
          ? foodCategorysModel.data.foodCategories.map(foodCategory =>
              new FoodCategory().deserialize(foodCategory)
            )
          : [];
      })
    );
  }
}
