import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/providers/auth.service";

@Component({
    selector: "serious-game-navbar",
    styleUrls: ["./navbar.component.scss"],
    templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {
    public navigate: any;
    public user;

    /**
     * @param authService authentication service
     * @param router application router
     */
    constructor(private authService: AuthService, private router: Router) {}

    /**
     * Initializes the side menu data after initializing the component.
     */
    public ngOnInit() {
        this.getUser();
    }

    public getUser() {
        this.authService.getRelatedUser().subscribe((user) => {
            this.user = user;
            this.sideMenu();
        });
    }

    /**
     * Removes the authentication token and navigates the user back to the login
     */
    public onLogout() {
        this.authService.logout();
        this.router.navigateByUrl("/login");
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
                visible: this.authService.isLoggedIn()
            },
            {
                icon: "person",
                title: "Profil",
                url: "/profile",
                visible: this.authService.isLoggedIn()
            },
            {
                icon: "lock",
                title: "Passwort ändern",
                url: "/change-password",
                visible: this.authService.isLoggedIn()
            },
            {
                icon: "arrow-dropleft-circle",
                onClick: "onLogout",
                title: "Logout",
                visible: this.authService.isLoggedIn()
            },
            {
                icon: "arrow-dropright-circle",
                title: "Login",
                url: "/login",
                visible: !this.authService.isLoggedIn()
            }
        ];
    }
}
