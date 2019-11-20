import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {FoodCategory} from "src/lib/models/FoodCategory";
import {HttpResponse, HttpResponseStatus} from "src/lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class FoodCategoryService {
    constructor(private http: HttpClient) {
    }

    /**
     * Returns the food-category by id.
     *
     * @param id id of the food-category to receive
     */
    public get(id): Observable<FoodCategory> {
        return this.http
            .get<HttpResponse>(`food-categories/${id}`)
            .pipe(
                map((foodCategory) =>
                    new FoodCategory().deserialize(
                        new HttpResponse().deserialize(foodCategory).data.foodCategory
                    )
                )
            );
    }

    /**
     * Returns all food-categories of the application
     */
    public getAll(): Observable<FoodCategory[]> {
        return this.http.get<HttpResponse>(`food-categories`).pipe(
            map((foodCategories) => {
                const foodCategoriessModel = new HttpResponse().deserialize(
                    foodCategories
                );
                return foodCategoriessModel.status === HttpResponseStatus.SUCCESS
                    ? foodCategoriessModel.data.foodCategories.map((foodCategory) =>
                        new FoodCategory().deserialize(foodCategory)
                    )
                    : [];
            })
        );
    }
}
