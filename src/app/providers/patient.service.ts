import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Patient} from "src/lib/models/Patient";
import {HttpResponse} from "src/lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class PatientService {
    constructor(private http: HttpClient) {
    }

    /**
     * Returns the patient by id.
     *
     * @param id id of the patient to retrieve
     */
    public get(id): Observable<Patient> {
        return this.http.get<HttpResponse>(`patients/${id}`)
            .pipe(
                map((patient) => new Patient().deserialize(new HttpResponse().deserialize(patient).data)));
    }

    /**
     * Returns all patients of the application.
     */
    public getAll(): Observable<Patient[]> {
        return this.http
            .get<HttpResponse>(`patients`)
            .pipe(
                map((patients) => {
                        const patientsModel = new HttpResponse().deserialize(patients);
                        return patientsModel.data.map((patient) => new Patient().deserialize(patient));
                    }
                )
            );
    }
}
