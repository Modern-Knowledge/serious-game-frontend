import { Injectable } from "@angular/core";
import { Errortext } from "src/lib/models/Errortext";
import {
  HttpResponse,
  HttpResponseStatus
} from "src/lib/utils/http/HttpResponse";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ErrorTextService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Errortext> {
    return this.http
      .get<HttpResponse>(`errortexts/${id}`)
      .pipe(
        map(errortext =>
          new Errortext().deserialize(
            new HttpResponse().deserialize(errortext).data.errortext
          )
        )
      );
  }

  getAll(): Observable<Errortext[]> {
    return this.http.get<HttpResponse>(`errortexts`).pipe(
      map(errorText => {
        const errorTextsModel = new HttpResponse().deserialize(errorText);
        return errorTextsModel.status === HttpResponseStatus.SUCCESS
          ? errorTextsModel.data.errortexts.map(errortext =>
              new Errortext().deserialize(errortext)
            )
          : [];
      })
    );
  }
}
