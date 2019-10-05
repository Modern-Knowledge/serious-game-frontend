import { Injectable } from "@angular/core";
import { Ingredient } from "src/lib/models/Ingredient";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  HttpResponse,
  HttpResponseStatus
} from "src/lib/utils/http/HttpResponse";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class IngredientService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Ingredient> {
    return this.http
      .get<HttpResponse>(`ingredients/${id}`)
      .pipe(
        map(ingredient =>
          new Ingredient().deserialize(
            new HttpResponse().deserialize(ingredient).data
          )
        )
      );
  }

  getAll(): Observable<Ingredient[]> {
    return this.http.get<HttpResponse>(`ingredients`).pipe(
      map(ingredients => {
        const ingredientsModel = new HttpResponse().deserialize(ingredients);
        return ingredientsModel.status === HttpResponseStatus.SUCCESS
          ? ingredientsModel.data.map(ingredient =>
              new Ingredient().deserialize(ingredient)
            )
          : [];
      })
    );
  }
}
