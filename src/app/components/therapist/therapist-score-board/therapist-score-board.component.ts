import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SessionService } from "src/app/providers/session.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { getDifference } from "src/app/util/dateUtils";

@Component({
    selector: "serious-game-therapist-score-board",
    styleUrls: ["./therapist-score-board.component.scss"],
    templateUrl: "./therapist-score-board.component.html"
})
export class TherapistScoreBoardComponent implements OnInit, OnDestroy {
    public sessions: any[];
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
                    .getForTherapist(user.id)
                    .subscribe((sessions) => {
                        this.sessions = this.groupByPatient(sessions);
                    });
            })
        );
    }
    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * Groups the sessions by patients
     */
    public groupByPatient(patients) {
        return patients.map(
            (patientSessions) =>
                (patientSessions = {
                    patient: patientSessions[0],
                    sessions: this.groupByName(patientSessions[1])
                })
        );
    }

    /**
     * Groups the sessions by the game name.
     */
    public groupByName(sessions) {
        return sessions.reduce((s, x) => {
            s[x.gameId] = [...(s[x.gameId] || []), x];
            return s;
        }, []).filter((session) => session)
    }
}
