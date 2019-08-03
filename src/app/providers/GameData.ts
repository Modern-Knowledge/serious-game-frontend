import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameData {
  data: any;

  public constructor(
    private http: HttpClient
  ) {}

  public load() {
    if (this.data) {
      console.log('sadasds');
      return of(this.data);
    } else {
      console.log('loaded');
      const t = this.http.get('http://localhost:3003/home').pipe(map(s => console.log(s)));
      console.log(t);
      return t;
    }
  }

}
