import {HttpHeaders} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {HttpResponse} from "../../../lib/utils/http/HttpResponse";
import {AuthService} from "../../providers/auth.service";
import {UtilService} from "../../providers/util/util.service";

@Component({
    selector: "serious-game-logs",
    styleUrls: ["./logs.page.scss"],
    templateUrl: "./logs.page.html",
})
export class LogsPage {
    public isTherapist: boolean;
    private logs: any = [];
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
     * Executed, when the view is left.
     */
    public ionViewDidLeave(): void {
        this.subscription.unsubscribe();
    }

}
