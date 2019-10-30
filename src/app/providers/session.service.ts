import { Injectable } from "@angular/core";
import { Session } from "../../../src/lib/models/Session";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { UserStoreService } from "./store/user-store.service";
import { Patient } from "src/lib/models/Patient";
import { Therapist } from "src/lib/models/Therapist";
import {
  HttpResponse,
  HttpResponseStatus
} from "src/lib/utils/http/HttpResponse";

@Injectable({
  providedIn: "root"
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
          ? sessionsModel.data.sessions.map(session =>
              new Session().deserialize(session)
            )
          : [];
      })
    );
  }

  create(
    gameId: number,
    patientId: number,
    gameSettingId: number,
    elapsedTime: number
  ) {
    return this.http.post<Session>("sessions", {
      _gameId: gameId,
      _patientId: patientId,
      _gameSettingId: gameSettingId,
      _elapsedTime: elapsedTime
    });
  }
}
