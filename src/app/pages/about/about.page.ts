import {Component} from "@angular/core";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {formatDate} from "serious-game-library/dist/utils/dateFormatter";
import {HttpResponse} from "serious-game-library/dist/utils/http/HttpResponse";
import {AuthService} from "../../providers/auth.service";
import {UtilService} from "../../providers/util/util.service";
import {VersionService} from "../../providers/version/version.service";

@Component({
    selector: "serious-game-about",
    styleUrls: ["./about.page.scss"],
    templateUrl: "./about.page.html"
})
export class AboutPage {
    public data: any;
    public version: string;
    public lastBuildDate: string;
    public uptime: string;
    public commit: string;
    public mysql: string;
    public nodejs: string;
    public authors: string[];
    public os: string;
    public mailServer: string;
    public database: string;

    public mailServerReachable: boolean;
    public databaseReachable: boolean;

    public environment: any;
    public lastBuildDateFrontend: string;

    public changelogFrontend: string;
    public changelogBackend: string;

    public subscription: Subscription;

    public showChangelogFrontend: boolean = false;
    public showChangelogBackend: boolean = false;

    constructor(
        private versionService: VersionService,
        private utilService: UtilService,
        public authService: AuthService
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
        if (this.authService.isTherapist() && this.authService.isAdmin()) {
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
        }
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

    public toggleChangelogFrontend(): void {
        this.showChangelogFrontend = !this.showChangelogFrontend;
    }

    public toggleChangelogBackend(): void {
        this.showChangelogBackend = !this.showChangelogBackend;
    }
}
