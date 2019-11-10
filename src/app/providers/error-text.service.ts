import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Errortext } from 'src/lib/models/Errortext';
import { Session } from 'src/lib/models/Session';
import { HttpResponse, HttpResponseStatus } from 'src/lib/utils/http/HttpResponse';

@Injectable({
  providedIn: 'root'
})
export class ErrorTextService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Errortext> {
    return this.http
      .get<HttpResponse>(`errortexts/${id}`)
      .pipe(
        map(errortext =>
          new Errortext().deserialize(new HttpResponse().deserialize(errortext).data.errortext)
        )
      );
  }

  getAll(): Observable<Errortext[]> {
    return this.http.get<HttpResponse>(`errortexts`).pipe(
      map(errorText => {
        const errorTextsModel = new HttpResponse().deserialize(errorText);
        return errorTextsModel.status === HttpResponseStatus.SUCCESS
          ? errorTextsModel.data.errortexts.map(errortext => new Errortext().deserialize(errortext))
          : [];
      })
    );
  }

  create(errortext: Errortext, session: Session): Observable<Errortext> {
    return this.http.post<HttpResponse>(`errortexts`, { errortext, session }).pipe(
      map(errorText => {
        const errorTextsModel = new HttpResponse().deserialize(errorText);
        return errorTextsModel.status === HttpResponseStatus.SUCCESS
          ? errorTextsModel.data.errortexts.map(errortext => new Errortext().deserialize(errortext))
          : [];
      })
    );
  }

  bulkCreate(errortexts: Errortext[], session: Session): Observable<Errortext> {
    return this.http.post<HttpResponse>(`errortexts/bulk`, { errortexts, session }).pipe(
      map(errorText => {
        const errorTextsModel = new HttpResponse().deserialize(errorText);
        return errorTextsModel.status === HttpResponseStatus.SUCCESS
          ? errorTextsModel.data.errortexts.map(errortext => new Errortext().deserialize(errortext))
          : [];
      })
    );
  }
}
