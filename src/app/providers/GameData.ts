import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../lib/models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameData {
  private data: User[];

  public constructor(
    private http: HttpClient
  ) {}

  public load() {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get(environment.backendUrl + '/home').pipe(map(this.processData, this));
    }
  }

  private processData(data: any): User[] {
    const users: User[] = [];

    for (const item of data) {
      const u: User = new User();
      u.username = item._username;

      users.push(u);
    }

    this.data = users;
    console.log(this.data);

    return this.data;
  }

}
