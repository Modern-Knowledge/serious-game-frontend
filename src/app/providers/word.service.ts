import { Injectable } from "@angular/core";
import { Word } from "src/lib/models/Word";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WordService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Word> {
    return this.http
      .get<Word>(`words/${id}`)
      .pipe(map(word => new Word().deserialize(word)));
  }

  getAll(): Observable<Word[]> {
    return this.http
      .get<Word[]>(`words`)
      .pipe(
        map(words =>
          words.length ? words.map(word => new Word().deserialize(word)) : null
        )
      );
  }
}
