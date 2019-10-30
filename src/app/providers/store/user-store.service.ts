import { Injectable } from "@angular/core";
import { Logger, LoggingService } from "ionic-logging-service";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { Patient } from "src/lib/models/Patient";
import { Therapist } from "src/lib/models/Therapist";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root"
})
export class UserStoreService {
  private logging: Logger;
  private subscription: Subscription = new Subscription();
  constructor(
    private loggingService: LoggingService,
    private authService: AuthService
  ) {
    this.logging = this.loggingService.getLogger("user-store");
  }

  /**
   * the user should only be managed by the defined functions.
   */
  private readonly _user = new BehaviorSubject<Therapist | Patient>(null);

  /**
   * provide read-only access to the user as an observable.
   */
  readonly user$: Observable<any> = this._user.asObservable();

  /**
   * returns value in emitted user behavior subject.
   */
  get user(): Observable<Therapist | Patient> {
    const user = new Subject<Therapist | Patient>();
    if (!this._user.getValue()) {
      this.subscription.add(
        this.authService.getRelatedUser().subscribe(userResponse => {
          user.next(userResponse);
        })
      );
      return user.asObservable();
    } else {
      this.subscription.unsubscribe();
    }
    user.next(this._user.getValue());
    return user.asObservable();
  }
}
