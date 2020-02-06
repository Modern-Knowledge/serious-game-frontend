import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "../../../lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class VersionService {

    /**
     * @param http http-client
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Returns information's about the backend.
     */
    public get(): Observable<HttpResponse> {
        return this.http.get<HttpResponse>(`version`).pipe(
            map((version: HttpResponse) => new HttpResponse().deserialize(version))
        );
    }
}
