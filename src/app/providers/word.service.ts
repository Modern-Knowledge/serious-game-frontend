import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Word} from "serious-game-library/dist/models/Word";
import {HttpResponse, HttpResponseStatus} from "serious-game-library/dist/utils/http/HttpResponse";

@Injectable({
    providedIn: "root"
})
export class WordService {
    constructor(private http: HttpClient) {
    }

    /**
     * Returns the word by id.
     *
     * @param id id of the word to receive
     */
    public get(id): Observable<Word> {
        return this.http
            .get<HttpResponse>(`words/${id}`)
            .pipe(
                map((word) =>
                    new Word().deserialize(
                        new HttpResponse().deserialize(word).data.words
                    )
                )
            );
    }

    /**
     * Returns all words of the application.
     */
    public getAll(): Observable<Word[]> {
        return this.http.get<HttpResponse>(`words`).pipe(
            map((words) => {
                const wordsModel = new HttpResponse().deserialize(words);
                return wordsModel.status === HttpResponseStatus.SUCCESS
                    ? wordsModel.data.words.map((word) => new Word().deserialize(word))
                    : [];
            })
        );
    }
}
