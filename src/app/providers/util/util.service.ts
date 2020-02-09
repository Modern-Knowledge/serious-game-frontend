import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Mealtimes} from "../../../lib/enums/Mealtimes";
import {Difficulty} from "../../../lib/models/Difficulty";
import {HttpResponse, HttpResponseStatus} from "../../../lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class UtilService {

    /**
     * @param http http-client
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Loads information whether the database is accessible.
     */
    public getDatabaseInformation(): Observable<HttpResponse> {
        return this.http.get<HttpResponse>(`util/database`).pipe(
            map((database: HttpResponse) => new HttpResponse().deserialize(database))
        );
    }

    /**
     * Loads information whether the mail-server is accessible.
     */
    public getMailServerInformation(): Observable<HttpResponse> {
        return this.http.get<HttpResponse>(`util/mail-server`).pipe(
            map((mailServer: HttpResponse) => new HttpResponse().deserialize(mailServer))
        );
    }

    /**
     * Loads the database-version.
     */
    public getDatabaseVersion(): Observable<HttpResponse> {
        return this.http.get<HttpResponse>(`util/database-version`).pipe(
            map((mailServer: HttpResponse) => new HttpResponse().deserialize(mailServer))
        );
    }

    /**
     * Returns all mealtimes of the application.
     */
    public getMealtimes(): Observable<Mealtimes[]> {
        return this.http.get<HttpResponse>(`mealtimes`).pipe(
            map((mealtimes: HttpResponse) => {
                const mealtimesModel = new HttpResponse().deserialize(mealtimes);
                return mealtimesModel.status === HttpResponseStatus.SUCCESS ?
                    mealtimesModel.data.mealtimes.map(
                        (mealtime: Mealtimes) => mealtime
                    ) : [];
            })
        );
    }

    /**
     * Returns all difficulties of the application.
     */
    public getDifficulties(): Observable<Difficulty[]> {
        return this.http.get<HttpResponse>(`difficulties`).pipe(
            map((difficulties: HttpResponse) => {
                const difficultyModel = new HttpResponse().deserialize(difficulties);
                return difficultyModel.status === HttpResponseStatus.SUCCESS ?
                    difficultyModel.data.difficulties.map(
                        (difficulty: Difficulty) => new Difficulty().deserialize(difficulty)
                    ) : [];
            })
        );
    }

}