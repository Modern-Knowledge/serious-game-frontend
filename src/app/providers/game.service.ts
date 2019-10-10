import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Game } from "src/lib/models/Game";
import {
  HttpResponse,
  HttpResponseStatus
} from "src/lib/utils/http/HttpResponse";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Game> {
    return this.http
      .get<HttpResponse>(`games/${id}`)
      .pipe(
        map(game =>
          new Game().deserialize(new HttpResponse().deserialize(game).data.game)
        )
      );
  }

  getAll(): Observable<Game[]> {
    return this.http.get<HttpResponse>(`games`).pipe(
      map(games => {
        const gamesModel = new HttpResponse().deserialize(games);
        return gamesModel.status === HttpResponseStatus.SUCCESS
          ? gamesModel.data.game.map(game => new Game().deserialize(game))
          : [];
      })
    );
  }
}
