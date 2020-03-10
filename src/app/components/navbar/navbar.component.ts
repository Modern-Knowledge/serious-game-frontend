import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AuthService } from "src/app/providers/auth.service";
import { LeaveGuard } from "src/app/providers/guard/leave.guard";

@Component({
    selector: "serious-game-navbar",
    styleUrls: ["./navbar.component.scss"],
    templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {
    public navigate: any;
    public loggedIn: boolean;

    /**
     * @param authService authentication service
     * @param router application router
     */
    constructor(private authService: AuthService, private router: Router) {}

    /**
     * Initializes the side menu data after initializing the component.
     */
    public ngOnInit() {
        this.authService.isLoggedIn().subscribe((loggedIn) => {
            this.loggedIn = loggedIn;
            this.sideMenu();
        });
    }

    /**
     * Removes the authentication token and navigates the user back to the login,
     * if all guards are passed
     */
    public onLogout() {
        this.router.navigateByUrl("/login").then((valid) => {
            if (valid) {
                this.authService.logout();
            }
        });
    }

    /**
     * Returns an array consisting of the entries to be shown inside of the sidebar.
     * Every item hat an icon identifier, a title which is displayed,
     * an url to point the routing to, and a boolean value whether it should be displayed or not.
     * @returns An array of sidebar entries.
     */
    public sideMenu() {
        this.navigate = [
            {
                icon: "home",
                title: "Hauptmenü",
                url: "/main-menu",
                visible: this.loggedIn
            },
            {
                icon: "person",
                title: "Profil",
                url: "/profile",
                visible: this.loggedIn
            },
            {
                icon: "lock",
                title: "Passwort ändern",
                url: "/change-password",
                visible: this.loggedIn
            },
            {
                icon: "arrow-dropleft-circle",
                onClick: "onLogout",
                title: "Logout",
                visible: this.loggedIn
            },
            {
                icon: "arrow-dropright-circle",
                title: "Login",
                url: "/login",
                visible: !this.loggedIn
            }
        ];
    }
}
