import { Component } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Platform } from "@ionic/angular";
import moment from "moment";

@Component({
    selector: "serious-game-root",
    templateUrl: "app.component.html"
})
export class AppComponent {
    /**
     * @param platform platform
     * @param splashScreen splashscreen when starting the app
     * @param statusBar status bar
     */
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    public initializeApp() {
        moment.locale("de");
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
