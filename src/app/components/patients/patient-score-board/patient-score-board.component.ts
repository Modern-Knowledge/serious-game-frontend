import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { SessionService } from "src/app/providers/session.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { getDifference } from "src/app/util/dateUtils";
import { Session } from "serious-game-library/dist/models/Session";

@Component({
    selector: "serious-game-patient-score-board",
    styleUrls: ["./patient-score-board.component.scss"],
    templateUrl: "./patient-score-board.component.html"
})
export class PatientScoreBoardComponent implements OnInit, OnDestroy {
    public sessions: Observable<Session[]>;
    private subscription: Subscription = new Subscription();

    constructor(
        private sessionService: SessionService,
        private userStore: UserStoreService
    ) {}

    /**
     * Imports the getDifference function from dateUtils to get the difference between two Date Objects.
     * @param start - The starting date.
     * @param end - The ending date.
     */
    public getDifference(start: Date, end: Date) {
        return getDifference(start, end);
    }

    public ngOnInit() {
        this.subscription.add(
            this.userStore.user.subscribe((user) => {
                this.sessionService
                    .getForPatient(user.id)
                    .subscribe((sessions) => {
                        this.sessions = this.groupByName(sessions).filter(
                            (session) => session
                        );
                    });
            })
        );
    }
    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * Groups the sessions by the game name.
     */
    public groupByName(sessions) {
        return sessions.reduce((s, x) => {
            s[x.gameId] = [...(s[x.gameId] || []), x];
            return s;
        }, []);
    }
}
