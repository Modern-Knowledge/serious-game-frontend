import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Patient } from "src/lib/models/Patient";
import { HttpResponse, HttpResponseStatus } from "src/lib/utils/http/HttpResponse";

import { Session } from "../../lib/models/Session";

@Injectable({
    providedIn: "root"
})
export class SessionService {
    constructor(private http: HttpClient) {}

    /**
     * Returns the session by id.
     *
     * @param id id the session to receive
     */
    public get(id: number): Observable<Session> {
        return this.http
            .get<Session>(`sessions/${id}`)
            .pipe(map((session) => new Session().deserialize(session)));
    }

    /**
     * Returns the sessions for the given patient.
     *
     * @param id id of the patient
     */
    public getForPatient(id: number): Observable<Session[]> {
        return this.http.get<HttpResponse>(`sessions/patient/${id}`).pipe(
            map((sessions) => {
                const sessionsModel = new HttpResponse().deserialize(sessions);
                return sessionsModel.status === HttpResponseStatus.SUCCESS
                    ? sessionsModel.data.sessions.map((session) =>
                          new Session().deserialize(session)
                      )
                    : [];
            })
        );
    }

    /**
     * Returns the sessions for the given therapist.
     *
     * @param id id of the patient
     */
    public getForTherapist(id: number): Observable<Session[]> {
        return this.http.get<HttpResponse>(`sessions/therapist/${id}`).pipe(
            map((sessions) => {
                const sessionsModel = new HttpResponse().deserialize(sessions);
                return sessionsModel.status === HttpResponseStatus.SUCCESS
                    ? sessionsModel.data.sessions.map((session) => {
                          session[0] = new Patient().deserialize(session[0]);
                          session[1] = session[1].map((patientSession) => {
                              return new Session().deserialize(patientSession);
                          });
                          return session;
                      })
                    : [];
            })
        );
    }

    /**
     * Create a new Session with the given data.
     *
     * @param gameId game of the new session
     * @param patientId patient of the new session
     * @param gameSettingId game-setting of the new id
     * @param elapsedTime elapsed time of the session
     */
    public create(
        gameId: number,
        patientId: number,
        gameSettingId: number,
        elapsedTime: number
    ) {
        return this.http
            .post<HttpResponse>("sessions", {
                _elapsedTime: elapsedTime,
                _gameId: gameId,
                _gameSettingId: gameSettingId,
                _patientId: patientId
            })
            .pipe(
                map((session) => {
                    const sessionsModel = new HttpResponse().deserialize(
                        session
                    );
                    return new Session().deserialize(
                        sessionsModel.data.session
                    );
                })
            );
    }
}
