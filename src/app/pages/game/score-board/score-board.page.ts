import { Component, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { SessionService } from 'src/app/providers/session.service';
import { UserStoreService } from 'src/app/providers/store/user-store.service';
import { Session } from 'src/lib/models/Session';

@Component({
  selector: "serious-game-score-board",
  templateUrl: "./score-board.page.html",
  styleUrls: ["./score-board.page.scss"]
})
export class ScoreBoardPage implements OnInit, OnDestroy {
  public sessions: Observable<Array<Session>>;
  private subscription: Subscription = new Subscription();
  constructor(
    private sessionService: SessionService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.userStore.user.subscribe(user => {
        this.sessions = this.sessionService.getForPatient(user.id);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getDifference(start: Date, end: Date) {
    return moment.duration(moment(end).diff(start)).asMilliseconds();
  }

  countErrortexts(session: Session) {
    console.log(session);
    return session.statistic.errortexts.length;
  }
}
