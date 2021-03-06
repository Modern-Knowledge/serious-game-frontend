import { Injectable } from "@angular/core";
import { Logger, LoggingService } from "ionic-logging-service";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { PatientDto } from "serious-game-library/dist/models/Dto/PatientDto";
import { TherapistDto } from "serious-game-library/dist/models/Dto/TherapistDto";

import { AuthService } from "../auth.service";

@Injectable({
    providedIn: "root"
})
export class UserStoreService {
    private readonly _user = new BehaviorSubject<TherapistDto | PatientDto>(
        null
    );
    /**
     * provide read-only access to the user as an observable.
     */
    private readonly user$: Observable<any> = this._user.asObservable();
    private logging: Logger;
    private subscription: Subscription = new Subscription();

    /**
     * the user should only be managed by the defined functions.
     */
    constructor(
        private loggingService: LoggingService,
        private authService: AuthService
    ) {
        this.logging = this.loggingService.getLogger("user-store");
    }

    /**
     * returns value in emitted user behavior subject.
     */
    get user(): Observable<TherapistDto | PatientDto> {
        const user = new Subject<TherapistDto | PatientDto>();
        if (!this._user.getValue()) {
            this.subscription.add(
                this.authService.getRelatedUser().subscribe((userResponse) => {
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
