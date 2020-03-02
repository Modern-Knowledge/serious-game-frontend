import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TherapistDto } from "src/lib/models/Dto/TherapistDto";
import { Therapist } from "src/lib/models/Therapist";

@Injectable({
    providedIn: "root"
})
export class TherapistService {
    constructor(private http: HttpClient) {}

    /**
     * Returns a therapist by id.
     *
     * @param id id of the therapist to receive
     */
    public get(id): Observable<TherapistDto> {
        return this.http
            .get<TherapistDto>(`therapists/${id}`)
            .pipe(
                map((therapist) =>
                    new TherapistDto(
                        new Therapist().deserialize(therapist)
                    ).deserialize(therapist)
                )
            );
    }

    /**
     * Returns all therapists of the application.
     */
    public getAll(): Observable<TherapistDto[]> {
        return this.http
            .get<TherapistDto[]>(`therapists`)
            .pipe(
                map((therapists) =>
                    therapists.map((therapist) =>
                        new TherapistDto(
                            new Therapist().deserialize(therapist)
                        ).deserialize(therapist)
                    )
                )
            );
    }

    /**
     * Updates the given therapist.
     *
     * @param therapist therapist to update
     */
    public update(therapist: TherapistDto): Observable<TherapistDto> {
        return this.http
            .put(
                `therapists/${therapist.id}`,
                new TherapistDto(
                    new Therapist().deserialize(therapist)
                ).deserialize(therapist)
            )
            .pipe(
                map((response) =>
                    new TherapistDto(
                        new Therapist().deserialize(therapist)
                    ).deserialize(response)
                )
            );
    }
}
