import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Session } from "src/lib/models/Session";
import { SessionService } from "src/app/providers/session.service";
import { UserStoreService } from "src/app/providers/store/user-store.service";
import { User } from "src/lib/models/User";
import { Therapist } from "src/lib/models/Therapist";
import { Patient } from "src/lib/models/Patient";
import moment from "moment";
@Component({
  selector: "serious-game-score-board",
  templateUrl: "./score-board.page.html",
  styleUrls: ["./score-board.page.scss"]
})
export class ScoreBoardPage implements OnInit {
  sessions: Observable<Array<Session>>;
  userSubscription: Subscription;
  constructor(
    private sessionService: SessionService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.userSubscription = this.userStore.user.subscribe(user => {
      this.sessions = this.sessionService.getForPatient(user.id);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  getDifference(start: Date, end: Date) {
    return moment.duration(moment(end).diff(start)).asMilliseconds();
  }
}
