import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {formatDateTime} from "../../../lib/utils/dateFormatter";
import {HttpResponse} from "../../../lib/utils/http/HttpResponse";
import {UtilService} from "../../providers/util/util.service";

@Component({
    selector: "serious-game-log",
    styleUrls: ["./log.page.scss"],
    templateUrl: "./log.page.html",
})
export class LogPage {
    public orderObj;
    public name: string;
    public log: any = [];
    private subscription: Subscription;

    constructor(
        private utilService: UtilService,
        private route: ActivatedRoute
    ) {
        this.subscription = new Subscription();
    }

    public ionViewWillEnter() {
        this.route.queryParamMap.subscribe((params) => {
            this.orderObj = {...params};
            this.name = this.orderObj.params.name;
            let level = this.orderObj.params.level;
            level = level ? "?level=" + level : "";

            this.subscription.add(
                this.utilService.getLog(this.name + level).subscribe((log: HttpResponse) => {
                    if (log.data.content && Object.entries(log.data.content).length > 0) {
                        this.log = log.data.content.map((value) => {
                            const nl = {...value};
                            nl.timestamp = formatDateTime(value.timestamp);
                            return nl;
                        }).reverse();
                    }
                })
            );
        });
    }

    /**
     * Executed, when the view is left.
     */
    public ionViewDidLeave(): void {
        this.subscription.unsubscribe();
    }

}
