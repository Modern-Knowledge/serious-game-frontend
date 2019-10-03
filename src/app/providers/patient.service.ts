import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Patient } from "src/lib/models/Patient";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PatientService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Patient> {
    return this.http.get<Patient>(`patients/${id}`);
  }

  getAll(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(`patients`)
      .pipe(
        map(patients =>
          patients.map(patient => new Patient().deserialize(patient))
        )
      );
  }
}
