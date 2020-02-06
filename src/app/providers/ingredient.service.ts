import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Ingredient} from "src/lib/models/Ingredient";
import {HttpResponse, HttpResponseStatus} from "src/lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class IngredientService {
    constructor(private http: HttpClient) {
    }

    /**
     * Returns the ingredient by id.
     *
     * @param id id of the ingredient to receive
     */
    public get(id): Observable<Ingredient> {
        return this.http
            .get<HttpResponse>(`ingredients/${id}`)
            .pipe(
                map((ingredient) =>
                    new Ingredient().deserialize(
                        new HttpResponse().deserialize(ingredient).data.ingredients
                    )
                )
            );
    }

    /**
     * Returns all ingredients of the application.
     */
    public getAll(): Observable<Ingredient[]> {
        return this.http.get<HttpResponse>(`ingredients`)
            .pipe(map(this.handleFoodCategory));
    }

    /**
     * Returns the ingredients for the given ingredients.
     *
     * @param foodCategory food-category for the ingredients
     */
    public getByFoodCategory(foodCategory: number): Observable<Ingredient[]> {
        return this.http
            .get<HttpResponse>(`ingredients/category/${foodCategory}`)
            .pipe(map(this.handleFoodCategory));
    }

    /**
     * Deserialize the given ingredients.
     *
     * @param ingredients ingredients to deserialize
     */
    private handleFoodCategory(ingredients) {
        const ingredientsModel = new HttpResponse().deserialize(ingredients);
        return ingredientsModel.status === HttpResponseStatus.SUCCESS
            ? ingredientsModel.data.ingredients.map((ingredient) =>
                new Ingredient().deserialize(ingredient)
            )
            : [];
    }
}
