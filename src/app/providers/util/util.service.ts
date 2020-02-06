import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "../../../lib/utils/http/HttpResponse";

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

}
