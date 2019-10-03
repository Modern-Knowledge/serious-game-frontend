import { Injectable } from "@angular/core";
import { Word } from "src/lib/models/Word";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpResponse, HttpResponseStatus } from 'src/lib/utils/http/HttpResponse';

@Injectable({
  providedIn: "root"
})
export class WordService {
  constructor(private http: HttpClient) {}

  get(id): Observable<Word> {
    return this.http
      .get<HttpResponse>(`words/${id}`)
      .pipe(map(word => new Word().deserialize(new HttpResponse().deserialize(word).data)));
  }

  getAll(): Observable<Word[]> {
    return this.http
      .get<HttpResponse>(`words`)
      .pipe(
        map(words =>
          {
            const wordsModel = new HttpResponse().deserialize(words);
            return wordsModel.status === HttpResponseStatus.SUCCESS ? wordsModel.data.map(word => new Word().deserialize(word)) : []
          }
        )
      );
  }
}
