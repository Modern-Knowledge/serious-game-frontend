import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse, HttpResponseStatus } from 'src/lib/utils/http/HttpResponse';

import { Session } from '../../../src/lib/models/Session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<Session> {
    return this.http
      .get<Session>(`sessions/${id}`)
      .pipe(map(session => new Session().deserialize(session)));
  }

  getForPatient(id: number): Observable<Session[]> {
    return this.http.get<HttpResponse>(`sessions/patient/${id}`).pipe(
      map(sessions => {
        const sessionsModel = new HttpResponse().deserialize(sessions);
        return sessionsModel.status === HttpResponseStatus.SUCCESS
          ? sessionsModel.data.sessions.map(session => new Session().deserialize(session))
          : [];
      })
    );
  }

  create(gameId: number, patientId: number, gameSettingId: number, elapsedTime: number) {
    return this.http
      .post<HttpResponse>('sessions', {
        _gameId: gameId,
        _patientId: patientId,
        _gameSettingId: gameSettingId,
        _elapsedTime: elapsedTime
      })
      .pipe(
        map(session => {
          const sessionsModel = new HttpResponse().deserialize(session);
          return new Session().deserialize(sessionsModel.data.session);
        })
      );
  }
}
