import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Therapist } from "src/lib/models/Therapist";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TherapistService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Therapist> {
    return this.http
      .get<Therapist>(`therapists/${id}`)
      .pipe(map(therapist => new Therapist().deserialize(therapist)));
  }

  getAll(): Observable<Therapist[]> {
    return this.http
      .get<Therapist[]>(`therapists`)
      .pipe(
        map(therapists =>
          therapists.map(therapist => new Therapist().deserialize(therapist))
        )
      );
  }

  update(therapist: Therapist): Observable<Therapist> {
    return this.http
      .put(`therapists/${therapist.id}`, new Therapist().deserialize(therapist))
      .pipe(map(response => new Therapist().deserialize(response)));
  }
}
