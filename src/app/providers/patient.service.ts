import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PatientDto } from "src/lib/models/Dto/PatientDto";
import { Patient } from "src/lib/models/Patient";
import { HttpResponse } from "src/lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class PatientService {
    constructor(private http: HttpClient) {}

    /**
     * Returns the patient by id.
     *
     * @param id id of the patient to retrieve
     */
    public get(id): Observable<PatientDto> {
        return this.http
            .get<HttpResponse>(`patients/${id}`)
            .pipe(
                map((patient) =>
                    new PatientDto(
                        new Patient().deserialize(patient)
                    ).deserialize(new HttpResponse().deserialize(patient).data)
                )
            );
    }

    /**
     * Returns all patients of the application.
     */
    public getAll(): Observable<PatientDto[]> {
        return this.http.get<HttpResponse>(`patients`).pipe(
            map((patients) => {
                const patientsModel = new HttpResponse().deserialize(patients);
                return patientsModel.data.patients.map((patient) =>
                    new PatientDto(
                        new Patient().deserialize(patient)
                    ).deserialize(patient)
                );
            })
        );
    }

    /**
     * Updates the given patient.
     *
     * @param patient patient to update
     */
    public update(patient: PatientDto): Observable<PatientDto> {
        return this.http
            .put(
                `patients/${patient.id}`,
                new PatientDto(new Patient().deserialize(patient)).deserialize(
                    patient
                )
            )
            .pipe(
                map((response) =>
                    new PatientDto(
                        new Patient().deserialize(response)
                    ).deserialize(response)
                )
            );
    }
}
