import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Game} from "src/lib/models/Game";
import {HttpResponse, HttpResponseStatus} from "src/lib/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class GameService {
    constructor(private http: HttpClient) {
    }

    /**
     * Returns the game by id.
     *
     * @param id id of the game to receive
     */
    public get(id): Observable<Game> {
        return this.http
            .get<HttpResponse>(`games/${id}`)
            .pipe(
                map((game) =>
                    new Game().deserialize(new HttpResponse().deserialize(game).data.game)
                )
            );
    }

    /**
     * Returns all games of the application.
     */
    public getAll(): Observable<Game[]> {
        return this.http.get<HttpResponse>(`games`).pipe(
            map((games) => {
                const gamesModel = new HttpResponse().deserialize(games);
                return gamesModel.status === HttpResponseStatus.SUCCESS
                    ? gamesModel.data.game.map((game) => new Game().deserialize(game))
                    : [];
            })
        );
    }
}
