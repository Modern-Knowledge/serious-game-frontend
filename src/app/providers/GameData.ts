import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../lib/models/User';
import { environment } from '../../environments/environment';
import { Logger, LoggingService } from 'ionic-logging-service';

@Injectable({
  providedIn: 'root'
})
export class GameData {
  private logger: Logger;

  private data: User[];

  public constructor(
    private http: HttpClient,
    private loggingService: LoggingService
  ) {
    this.logger = loggingService.getLogger('Serious-Game-Frontend.GameData');

    this.logger.debug('constructor', 'message', 'dsofjslkdfj', 'sadsad', 'dsfsdf');
  }

  public load() {
    console.log(environment);

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
      u.email = item.email;

      users.push(u);
    }

    this.data = users;
    console.log(this.data);

    return this.data;
  }

}
