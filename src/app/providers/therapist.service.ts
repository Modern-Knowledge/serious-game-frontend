import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Therapist} from "src/lib/models/Therapist";

@Injectable({
    providedIn: "root"
})
export class TherapistService {
    constructor(private http: HttpClient) {
    }

    /**
     * Returns a therapist by id.
     *
     * @param id id of the therapist to receive
     */
    public get(id): Observable<Therapist> {
        return this.http
            .get<Therapist>(`therapists/${id}`)
            .pipe(map((therapist) => new Therapist().deserialize(therapist)));
    }

    /**
     * Returns all therapists of the application.
     */
    public getAll(): Observable<Therapist[]> {
        return this.http
            .get<Therapist[]>(`therapists`)
            .pipe(
                map((therapists) =>
                    therapists.map((therapist) => new Therapist().deserialize(therapist))
                )
            );
    }

    /**
     * Updates the given therapist.
     *
     * @param therapist therapist to update
     */
    public update(therapist: Therapist): Observable<Therapist> {
        return this.http
            .put(`therapists/${therapist.id}`, new Therapist().deserialize(therapist))
            .pipe(map((response) => new Therapist().deserialize(response)));
    }
}
