import { Component, OnDestroy, OnInit } from "@angular/core";
import moment from "moment";
import { Observable, Subscription } from "rxjs";
import { SessionService } from "src/app/providers/session.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { Session } from "src/lib/models/Session";

@Component({
    selector: "serious-game-score-board",
    styleUrls: ["./score-board.page.scss"],
    templateUrl: "./score-board.page.html"
})
export class ScoreBoardPage implements OnInit, OnDestroy {
    public sessions: Observable<Session[]>;
    private subscription: Subscription = new Subscription();
    constructor(
        private sessionService: SessionService,
        private userStore: UserStoreService
    ) {}

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

    public getDifference(start: Date, end: Date) {
        const duration = moment.duration(moment(end).diff(start));
        const minutes = duration.minutes();
        duration.subtract(moment.duration(minutes, "minutes"));
        const seconds = duration.seconds();
        return { minutes, seconds };
    }

    public countErrortexts(session: Session) {
        return session.statistic.errortexts.length;
    }

    public groupByName(array) {
        return array.reduce((r, x) => {
            r[x.gameId] = [...(r[x.gameId] || []), x];
            return r;
        }, []);
    }
}
