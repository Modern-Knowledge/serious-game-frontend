import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Recipe} from "src/lib/models/Recipe";
import {HttpResponse, HttpResponseStatus} from "src/lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class RecipeService {

    /**
     * Serialize retrieved recipes into recipe objects.
     *
     * @param recipes retrieved recipes
     */
    private static serializeRecipes(recipes: HttpResponse) {
        const recipesModel = new HttpResponse().deserialize(recipes);
        return recipesModel.status === HttpResponseStatus.SUCCESS
            ? recipesModel.data.recipes.map((recipe) =>
                new Recipe().deserialize(recipe)
            ) : [];
    }

    /**
     * Serialize retrieved recipe into recipe object.
     *
     * @param recipe retrieved recipe
     */
    private static serializeRecipe(recipe: HttpResponse) {
        const recipeModel = new HttpResponse().deserialize(recipe);
        return recipeModel.status === HttpResponseStatus.SUCCESS ?
            new Recipe().deserialize(recipeModel.data.recipe) : null;
    }

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
            map(RecipeService.serializeRecipes)
        );
    }

    /**
     * Returns all recipes of the application
     */
    public getFiltered(mealtime: string, difficulty: number): Observable<Recipe[]> {
        return this.http.get<HttpResponse>(`recipes/${mealtime}/${difficulty}`).pipe(
            map(RecipeService.serializeRecipes)
        );
    }

    /**
     * Updates the recipe in the database.
     *
     * @param recipe recipe to update
     */
    public updateRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.put<HttpResponse>(`recipes/${recipe.id}`, recipe).pipe(
            map(RecipeService.serializeRecipe)
        );
    }
}
