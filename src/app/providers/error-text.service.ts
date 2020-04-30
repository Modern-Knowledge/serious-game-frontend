import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Errortext} from "serious-game-library/dist/models/Errortext";
import {Session} from "serious-game-library/dist/models/Session";
import {HttpResponse, HttpResponseStatus} from "serious-game-library/dist/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class ErrorTextService {
    constructor(private http: HttpClient) {}

    /**
     * Returns the errortext with the specified id.
     *
     * @param id id of the errortext to receive
     */
    public get(id): Observable<Errortext> {
        return this.http
            .get<HttpResponse>(`errortexts/${id}`)
            .pipe(
                map((errortext) =>
                    new Errortext().deserialize(new HttpResponse().deserialize(errortext).data.errortext)
                )
            );
    }

    /**
     * Returns all errortexts of the errortext.
     */
    public getAll(): Observable<Errortext[]> {
        return this.http.get<HttpResponse>(`errortexts`).pipe(
            map(this.handleReceivedErrortexts)
        );
    }

    /**
     * Insert an errortext with the specified id for the given session.
     *
     * @param errortext errortext to create
     * @param session session where the errortext should be created
     */
    public create(errortext: Errortext, session: Session): Observable<Errortext> {
        return this.http.post<HttpResponse>(`errortexts`, {errortext, session}).pipe(
            map(this.handleReceivedErrortexts)
        );
    }

    /**
     * Inserts multiple errortexts for the given session.
     *
     * @param errortexts array of errortexts to create
     * @param session session for the errortexts
     */
    public bulkCreate(errortexts: Errortext[], session: Session): Observable<Errortext> {
        return this.http.post<HttpResponse>(`errortexts/bulk`, {errortexts, session}).pipe(
            map(this.handleReceivedErrortexts)
        );
    }

    /**
     * Converts received errortexts to an array of errortexts
     *
     * @param errorText errortext to deserialize
     */
    private handleReceivedErrortexts(errorText) {
        const errorTextsModel = new HttpResponse().deserialize(errorText);
        return errorTextsModel.status === HttpResponseStatus.SUCCESS
            ? errorTextsModel.data.errortexts.map((errortext) => new Errortext().deserialize(errortext))
            : [];
    }
}
