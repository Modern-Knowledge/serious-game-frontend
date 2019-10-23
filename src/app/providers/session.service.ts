import { Injectable } from "@angular/core";
import { Session } from "../../../src/lib/models/Session";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor(private http: HttpClient) {}

  create(gameId: number, patientId: number, gameSettingId: number) {
    return this.http.post<Session>("sessions", {
      _gameId: gameId,
      _patientId: patientId,
      _gameSettingId: gameSettingId
    });
  }
}
