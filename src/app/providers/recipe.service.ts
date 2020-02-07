import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Recipe} from "src/lib/models/Recipe";
import {HttpResponse, HttpResponseStatus} from "src/lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class RecipeService {
    constructor(private http: HttpClient) {
    }

    /**
     * Returns the recipe by id.
     *
     * @param id id of the recipe to receive
     */
    public get(id): Observable<Recipe> {
        return this.http
            .get<HttpResponse>(`recipes/${id}`)
            .pipe(
                map((recipe) =>
                    new Recipe().deserialize(
                        new HttpResponse().deserialize(recipe).data.recipes
                    )
                )
            );
    }

    /**
     * Returns all recipes of the application
     */
    public getAll(): Observable<Recipe[]> {
        return this.http.get<HttpResponse>(`recipes`).pipe(
            map(this.serializeRecipes)
        );
    }

    /**
     * Returns all recipes of the application
     */
    public getFiltered(mealtime: string, difficulty: number): Observable<Recipe[]> {
        return this.http.get<HttpResponse>(`recipes/${mealtime}/${difficulty}`).pipe(
            map(this.serializeRecipes)
        );
    }

    /**
     * Serialize retrieved recipes into recipe objects.
     *
     * @param recipes retrieved recipes
     */
    private serializeRecipes(recipes: HttpResponse) {
        const recipesModel = new HttpResponse().deserialize(recipes);
        return recipesModel.status === HttpResponseStatus.SUCCESS
            ? recipesModel.data.recipes.map((recipe) =>
                new Recipe().deserialize(recipe)
            ) : [];
    }
}
