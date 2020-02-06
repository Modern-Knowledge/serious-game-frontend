import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ImageService {
    constructor(private http: HttpClient) {}

    /**
     * Returns an image by id.
     *
     * @param id id of the image to receive
     */
    public get(id): Observable<Blob> {
        return this.http.get(`images/${id}`, {
            responseType: "blob"
        });
    }
}
