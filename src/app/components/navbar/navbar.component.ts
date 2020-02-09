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

    /**
     * @param authService authentication service
     * @param router application router
     */
    constructor(private authService: AuthService, private router: Router) {}

    /**
     * Initializes the side menu data after initializing the component.
     */
    public ngOnInit() {
        this.sideMenu();
    }

    /**
     * Removes the authentication token and navigates the user back to the login
     */
    public onLogout() {
        this.authService.logout();
        this.router.navigateByUrl("/login");
    }

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
