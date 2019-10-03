import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Patient } from "src/lib/models/Patient";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpResponse } from 'src/lib/utils/http/HttpResponse';

@Injectable({
  providedIn: "root"
})
export class PatientService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Patient> {
    return this.http.get<HttpResponse>(`patients/${id}`)
    .pipe(
      map(patient => new Patient().deserialize(new HttpResponse().deserialize(patient).data)));
  }

  getAll(): Observable<Patient[]> {
    return this.http
      .get<HttpResponse>(`patients`)
      .pipe(
        map(patients => {
          const patientsModel = new HttpResponse().deserialize(patients);
          return patientsModel.data.map(patient => new Patient().deserialize(patient))
        } 
        )
      );
  }
}
