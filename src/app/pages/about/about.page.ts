import {Component, OnInit} from "@angular/core";
import moment from "moment";
import {Subscription} from "rxjs";
import {formatDate} from "../../../lib/utils/dateFormatter";
import {HttpResponse} from "../../../lib/utils/http/HttpResponse";
import {VersionService} from "../../providers/version/version.service";
import {environment} from "../../../environments/environment";

@Component({
    selector: "serious-game-about",
    styleUrls: ["./about.page.scss"],
    templateUrl: "./about.page.html"
})
export class AboutPage {
    private data: any;
    private version: string;
    private lastBuildDate: string;
    private uptime: string;
    private commit: string;
    private mysql: string;
    private nodejs: string;
    private authors: string[];
    private os: string;

    private environment: any;
    private lastBuildDateFrontend: string;

    private subscription: Subscription;

    constructor(
        private versionService: VersionService
    ) {
        this.subscription = new Subscription();
        this.environment = environment;
        this.lastBuildDateFrontend = formatDate(this.environment.lastBuildDate);
    }

    public ionViewWillEnter() {
        this.subscription.add(
            this.versionService.get().subscribe((version: HttpResponse) => {
                this.data = version.data;
                this.version = this.data.version;
                this.lastBuildDate = formatDate(this.data.lastBuildDate);
                this.uptime = this.data.uptime;
                this.commit = this.data.commit;
                this.mysql = this.data.mysql;
                this.nodejs = this.data.nodejs;
                this.os = this.data.os;
                this.authors = this.data.authors.map((author) => author.name).join(", ");
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
