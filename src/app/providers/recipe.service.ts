import { Injectable } from "@angular/core";
import { Recipe } from "src/lib/models/Recipe";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Recipe> {
    return this.http
      .get<Recipe>(`recipes/${id}`)
      .pipe(map(recipe => new Recipe().deserialize(recipe)));
  }

  getAll(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`recipes`)
      .pipe(
        map(recipes =>
          recipes.length
            ? recipes.map(recipe => new Recipe().deserialize(recipe))
            : []
        )
      );
  }
}
