import { Injectable } from "@angular/core";
import { Recipe } from "src/lib/models/Recipe";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpResponse, HttpResponseStatus } from 'src/lib/utils/http/HttpResponse';

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Recipe> {
    return this.http
      .get<HttpResponse>(`recipes/${id}`)
      .pipe(map(recipe => new Recipe().deserialize(new HttpResponse().deserialize(recipe).data)));
  }

  getAll(): Observable<Recipe[]> {
    return this.http
      .get<HttpResponse>(`recipes`)
      .pipe(
        map(recipes => {
          const recipesModel = new HttpResponse().deserialize(recipes);
          return recipesModel.status === HttpResponseStatus.SUCCESS
          ? recipesModel.data.map(recipe => new Recipe().deserialize(recipe))
          : []
        }
        )
      );
  }
}
