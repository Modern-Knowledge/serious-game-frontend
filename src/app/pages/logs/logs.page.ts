import {Component} from "@angular/core";
import {Subscription} from "rxjs";
import {HttpResponse} from "serious-game-library/dist/utils/http/HttpResponse";
import {AuthService} from "../../providers/auth.service";
import {UtilService} from "../../providers/util/util.service";

@Component({
    selector: "serious-game-logs",
    styleUrls: ["./logs.page.scss"],
    templateUrl: "./logs.page.html",
})
export class LogsPage {
    public isTherapist: boolean;
    public logs: any;
    public level: string;

    public possibleLevel = {
        debug: 0,
        error: 3,
        info: 1,
        warn: 2
    };
    private subscription: Subscription;

    constructor(
        private utilService: UtilService,
        private authService: AuthService
    ) {
        this.subscription = new Subscription();
    }

    public ionViewWillEnter() {
        this.isTherapist = this.authService.isTherapist();

        this.subscription.add(
            this.utilService.getLogs().subscribe((logs: HttpResponse) => {
                this.logs = logs.data.files;
                this.level = logs.data.level;
            })
        );
    }

    public deleteLogs(name: string) {
        this.subscription.add(
            this.utilService.deleteLogs(name).subscribe(() => {
                this.utilService.getLogs().subscribe((logs: HttpResponse) => {
                    this.logs = logs.data.files;
                });
            })
        );
    }

    /**
     * Returns true if the button with the given level should be displayed.
     * The levels that should be displayed are sent with the backend.
     *
     * @param btnLevel level of the button that should be displayed
     */
    public showButton(btnLevel: string): boolean {
        const nr = this.possibleLevel[btnLevel];
        const backendLevel = this.possibleLevel[this.level];

        return nr >= backendLevel;
    }

    /**
     * Executed, when the view is left.
     */
    public ionViewDidLeave(): void {
        this.subscription.unsubscribe();
    }

}
