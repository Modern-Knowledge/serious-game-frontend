import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {formatDate} from "../../../lib/utils/dateFormatter";
import {HttpResponse} from "../../../lib/utils/http/HttpResponse";
import {UtilService} from "../../providers/util/util.service";
import {VersionService} from "../../providers/version/version.service";

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
    private mailServer: string;
    private database: string;

    private mailServerReachable: boolean;
    private databaseReachable: boolean;

    private environment: any;
    private lastBuildDateFrontend: string;

    private changelogFrontend: string;
    private changelogBackend: string;

    private subscription: Subscription;

    constructor(
        private versionService: VersionService,
        private utilService: UtilService
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
                this.nodejs = this.data.nodejs;
                this.os = this.data.os;
                this.mailServer = this.data.mailServer;
                this.database = this.data.database;
                this.authors = this.data.authors.map((author) => author.name).join(", ");
            })
        );
        this.subscription.add(
            this.utilService.getDatabaseInformation().subscribe((database: HttpResponse) => {
                this.databaseReachable = database.data.connectable;
            })
        );
        this.subscription.add(
            this.utilService.getMailServerInformation().subscribe((mailServer: HttpResponse) => {
                this.mailServerReachable = mailServer.data.connectable;
            })
        );
        this.subscription.add(
            this.utilService.getDatabaseVersion().subscribe((databaseVersion: HttpResponse) => {
                this.mysql = databaseVersion.data.version;
            })
        );
        this.subscription.add(
           this.utilService.getBackendChangelog().subscribe((changelog: HttpResponse) => {
                this.changelogBackend = changelog.data.content;
            })
        );
        this.subscription.add(
            this.utilService.getFrontendChangelog().subscribe((changelog: string) => {
                this.changelogFrontend = changelog;
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
